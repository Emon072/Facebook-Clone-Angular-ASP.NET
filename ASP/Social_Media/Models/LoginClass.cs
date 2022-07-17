using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class LoginClass
    {
        [Key]

        public Guid Id { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
        public string Name { get; set; }
        public string ProfilePicture { get; set; }

    }
}
