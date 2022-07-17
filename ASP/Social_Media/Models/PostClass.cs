using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class PostClass
    {
        [Key]
        public Guid Id { get; set; }
        public Guid PostPersionId { get; set; }
        public string PostPersionProfilePicture { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PostMessage { get; set; }
        public string PostImage { get; set; }
        public int Like { get; set; }
    }
}
