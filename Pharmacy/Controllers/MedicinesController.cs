using Microsoft.AspNetCore.Mvc;
using PharmacyApi.Models;
using PharmacyApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PharmacyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        private readonly JsonFileService<Medicine> _service = new("medicines.json");


        [HttpGet]
        public IActionResult Get(string? search)
        {
            var data = _service.Read();
            if (!string.IsNullOrWhiteSpace(search))
                data = data.Where(m => m.FullName.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(data);
        }


        [HttpPost]
        public IActionResult Post(Medicine medicine)
        {
            var data = _service.Read();

            var existing = data.FirstOrDefault(m =>
                m.FullName.Equals(medicine.FullName, StringComparison.OrdinalIgnoreCase) &&
                m.Brand.Equals(medicine.Brand, StringComparison.OrdinalIgnoreCase));

            if (existing != null)
            {
                existing.Quantity += medicine.Quantity;
                existing.ExpiryDate = medicine.ExpiryDate;

                _service.Write(data);
                return Ok(new
                {
                    message = "Medicine quantity updated",
                    medicine = existing
                });
            }

            data.Add(medicine);
            _service.Write(data);

            return Ok(new
            {
                message = "New medicine added",
                medicine
            });
        }

    }
}
