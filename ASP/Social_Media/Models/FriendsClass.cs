using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class FriendsClass
    {
        [Key]
        public Guid Id { get; set; }
        public Guid friendId { get; set; }
        public Guid friendPersonId { get; set; }
    }
}
