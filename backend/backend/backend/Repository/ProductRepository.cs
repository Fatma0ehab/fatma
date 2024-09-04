using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using backend.Data.Repository.IRepository;
using backend.Models;

namespace backend.Data.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly string _connectionString;

        public ProductRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            var products = new List<Product>();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("GetAllProducts", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            products.Add(new Product
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                ImgUrl = reader.IsDBNull(reader.GetOrdinal("ImgUrl")) ? null : reader.GetString(reader.GetOrdinal("ImgUrl")) 
                            });
                        }
                    }
                }
            }

            return products;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            Product product = null;

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("GetProductById", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            product = new Product
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                ImgUrl = reader.IsDBNull(reader.GetOrdinal("ImgUrl")) ? null : reader.GetString(reader.GetOrdinal("ImgUrl")) 
                            };
                        }
                    }
                }
            }

            return product;
        }

    }
}

