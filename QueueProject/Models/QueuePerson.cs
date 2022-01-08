namespace QueueProject.Models
{
    public class QueuePerson
    {
        public Guid Id { get; set; }

        public Guid PlaceID { get; set; }
        public Place? Place { get; set; }

        public Guid? UserId { get; set; }
        public User? User { get; set; }

        public Guid StatusId { get; set; }
        public Status? Status { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}
