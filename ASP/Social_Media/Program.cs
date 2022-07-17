using Microsoft.EntityFrameworkCore;

using Social_Media.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// added later
// Injection DBcountect
builder.Services.AddDbContext<InitialDbContext>(options => options.UseSqlServer
    (builder.Configuration.GetConnectionString("loginDbConnectionString")));


builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});
// added finish

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// added later
app.UseCors("default");
// added finish

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
