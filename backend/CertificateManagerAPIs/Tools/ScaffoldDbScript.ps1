$outputDir = "Entities"
dotnet ef dbcontext scaffold "Name=CertificateDbConnection" Microsoft.EntityFrameworkCore.SqlServer -o Entities --context-dir Data
