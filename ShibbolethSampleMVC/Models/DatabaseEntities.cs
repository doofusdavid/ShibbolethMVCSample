using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ShibbolethSampleMVC.Models
{
    public partial class DatabaseEntities : DbContext
    {
        public DatabaseEntities() : base("ShibbolethSampleMVC")
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
    }
}