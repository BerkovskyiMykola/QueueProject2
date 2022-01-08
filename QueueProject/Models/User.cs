using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; } = "";
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; } = "";
        [Required]
        [EmailAddress]
        public string Email { set; get; } = "";
        [Required]
        public string Password { set; get; } = "";

        public Guid RoleId { get; set; }
        public Role? Role { get; set; }

        public List<Place> Places { get; set; } = new List<Place>();
        public List<QueuePerson> QueuePeople { get; set; } = new List<QueuePerson>();
    }
}
