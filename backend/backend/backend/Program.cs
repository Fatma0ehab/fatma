using backend.Data.Repository.IRepository;
using backend.Data.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Allow this origin
                  .AllowAnyMethod() // Allow any HTTP method
                  .AllowAnyHeader(); // Allow any headers
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connection string
var connectionString = builder.Configuration.GetConnectionString("SUSCloud");

// Register repositories
builder.Services.AddScoped<IProductRepository>(_ => new ProductRepository(connectionString));
builder.Services.AddScoped<IOrderRepository>(_ => new OrderRepository(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy
app.UseCors("MyPolicy");

// Serve static files
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
