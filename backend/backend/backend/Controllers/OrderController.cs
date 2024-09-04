﻿using backend.Data.Repository.IRepository;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost("place-order")]
        public async Task<IActionResult> PlaceOrder([FromBody] List<CartItem> cartItems)
        {
            
            if (cartItems == null || !cartItems.Any())
            {
                return BadRequest(new { Message = "Invalid cart items." });
            }

            try
            {
                
                await _orderRepository.PlaceOrderAsync(cartItems);

                return Ok(new { Message = "Order placed successfully." });
            }
            catch (Exception ex)
            {
               
                // Console.Error.WriteLine(ex);

                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }
    }
}
