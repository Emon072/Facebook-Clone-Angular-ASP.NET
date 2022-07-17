using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class StoryClass
    {
        [Key]
        public Guid StoryId { get; set; }
        public string SenderName { get; set; }
        public Guid SenderId {get; set; }
        public string StoryPicture { get; set; }

    }
}
