using FoccoEmFrente.Kanban.Application.Entities;
using FoccoEmFrente.Kanban.Application.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Services
{
    class ActivityServices : IActivityServices
    {

        private readonly IActivityRepository _activityRepository;
        
        public ActivityServices(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        public async Task<IEnumerable<Activity>> GetAllAsync(Guid userId)
        {
            return await _activityRepository.GetAllAsync(userId);
        }

        public async Task<Activity> GetByIdAsync(Guid id, Guid userId)
        {
            return await _activityRepository.GetByIdAsync(id, userId);
        }
        public async Task<bool> ExistAsync(Guid id, Guid userId)
        {
            return await _activityRepository.ExistAsync(id, userId);
        }

        public async Task<Activity> AddAsync(Activity activity)
        {
            var newActivity = _activityRepository.Add(activity);
            await _activityRepository.UnitOfWorks.CommitAsync();
            return newActivity;
        }

        public async Task<Activity> UpdateAsync(Activity activity)
        {
            var activitieExists = await ExistAsync(activity.Id, activity.UserId);
            if (!activitieExists)
                throw new Exception("Atividade não pode ser encontrada.");

            var updateActivity = _activityRepository.Update(activity);
            await _activityRepository.UnitOfWorks.CommitAsync();
            return updateActivity;

        }
        public async Task<Activity> RemoveAsync(Activity activity)
        {
            var activitieExists = await ExistAsync(activity.Id, activity.UserId);
            if (!activitieExists)
                throw new Exception("Atividade não pode ser encontrada.");

            var removeActivity = _activityRepository.Remove(activity);
            await _activityRepository.UnitOfWorks.CommitAsync();
            return removeActivity;
        }
        public async Task<Activity> RemoveAsync(Guid id, Guid userId)
        {
            var activityToBeRemoved = await GetByIdAsync(id, userId);

            if (activityToBeRemoved == null)
                throw new Exception("Atividade não pode ser encontrada.");

            var removeActivity = _activityRepository.Remove(activityToBeRemoved);
            await _activityRepository.UnitOfWorks.CommitAsync();
            return removeActivity;
        }


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

    }
}
