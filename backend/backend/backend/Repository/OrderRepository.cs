using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using backend.Data.Repository.IRepository;
using backend.Models;

namespace backend.Data.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly string _connectionString;

        public OrderRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task PlaceOrderAsync(List<CartItem> cartItems)
        {
            var productTable = new DataTable();
            productTable.Columns.Add("ProductId", typeof(int));
            productTable.Columns.Add("Quantity", typeof(int));

            foreach (var item in cartItems)
            {
                productTable.Rows.Add(item.ProductId, item.Quantity);
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("PlaceOrder", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    var parameter = new SqlParameter
                    {
                        ParameterName = "@Products",
                        SqlDbType = SqlDbType.Structured,
                        Value = productTable,
                        TypeName = "ProductTableType" // Ensure this matches the SQL table type
                    };

                    command.Parameters.Add(parameter);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
