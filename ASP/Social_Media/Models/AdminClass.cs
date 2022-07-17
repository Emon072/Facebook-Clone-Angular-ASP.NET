using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class AdminClass
    {
        [Key]
        public Guid AdminId { get; set; }
    }
}
