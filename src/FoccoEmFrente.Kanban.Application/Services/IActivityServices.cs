using FoccoEmFrente.Kanban.Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Services
{
    public interface IActivityServices : IDisposable
    {
        Task<IEnumerable<Activity>> GetAllAsync(Guid userId);

        Task<Activity> GetByIdAsync(Guid id, Guid userId);
        Task<bool> ExistAsync(Guid id, Guid userId);

        Task<Activity> AddAsync(Activity activity);
        Task<Activity> UpdateAsync(Activity activity);
        Task<Activity> RemoveAsync(Activity activity);
        Task<Activity> RemoveAsync(Guid id, Guid userId);

    }
}
