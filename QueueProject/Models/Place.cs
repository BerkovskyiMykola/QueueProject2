using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class Place
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { get; set; } = "";
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Address { get; set; } = "";
        public bool IsActive { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }

        public List<QueuePerson> QueuePeople { get; set; } = new List<QueuePerson>();
    }
}
