using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Repositories
{
    public interface IUnitOfWorks
    {
        Task<bool> CommitAsync();
    }
}