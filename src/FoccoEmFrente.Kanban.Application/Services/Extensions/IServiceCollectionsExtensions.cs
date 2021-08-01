using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoccoEmFrente.Kanban.Application.Services.Extensions
{
    public static class IServiceCollectionsExtensions
    {
        public static void AddAplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IActivityServices, ActivityServices>();
        }
    }
}
