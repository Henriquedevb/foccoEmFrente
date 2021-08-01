using FoccoEmFrente.Kanban.Application.Context;
using FoccoEmFrente.Kanban.Application.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        protected readonly KanbanContext DbContext;
        protected readonly DbSet<Activity> DbSet;
        public IUnitOfWorks UnitOfWorks => DbContext;
        public ActivityRepository(KanbanContext context)
        {
            DbContext = context;
            DbSet = DbContext.Set<Activity>();
        }

        public async Task<IEnumerable<Activity>> GetAllAsync(Guid userId)
        {
            return await DbSet.ToListAsync();
        }


        public async Task<Activity> GetByIdAsync(Guid id, Guid userId)
        {
            return await DbSet
                .Where(activities => activities.UserId == userId && activities.UserId == id)
                .FirstOrDefaultAsync();
        }
        public async Task<bool> ExistAsync(Guid id, Guid userId)
        {
            return await DbSet
                .Where(activities => activities.UserId == userId && activities.Id == id)
                .AnyAsync();
        }

        public Activity Add(Activity activity)
        {
            var entry = DbSet.Add(activity);
            return entry.Entity;
        }

        public Activity Update(Activity activity)
        {
            var entry = DbSet.Update(activity);
            return entry.Entity;
        }

        public Activity Remove(Activity activity)
        {
            var entry = DbSet.Remove(activity);
            return entry.Entity;
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }

    }
}
