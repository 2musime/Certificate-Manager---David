using Microsoft.EntityFrameworkCore;
namespace CertificateManagerAPIs.Services
{
    public static class ServiceExtension
    {
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CertificatedbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("CertificateDbConnection")));
        }
    }
}
