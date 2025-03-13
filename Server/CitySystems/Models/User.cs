using System.ComponentModel.DataAnnotations;

namespace CitySystems.Models
{
    public class User
    {
        [Key]
        [RegularExpression(@"^\d{5,9}$", ErrorMessage = "תעודת זהות לא תקינה")]
        public string IDNumber { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public int HouseNumber { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
