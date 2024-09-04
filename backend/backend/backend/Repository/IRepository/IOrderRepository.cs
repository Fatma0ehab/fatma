using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data.Repository.IRepository
{
    public interface IOrderRepository
    {
        Task PlaceOrderAsync(List<CartItem> cartItems);
    }
}
