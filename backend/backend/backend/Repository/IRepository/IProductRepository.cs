using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
    }
}
