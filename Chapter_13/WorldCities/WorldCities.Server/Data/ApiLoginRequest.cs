using System.ComponentModel.DataAnnotations;

namespace WorldCities.Server.Data
{
    public class ApiLoginRequest
    {
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
    }
}
