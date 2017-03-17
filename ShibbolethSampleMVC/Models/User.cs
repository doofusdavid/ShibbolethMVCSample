using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShibbolethSampleMVC.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Ename { get; set; }
        public DateTime LastLogin { get; set; }

        public ICollection<Role> Roles { get; set; }
    }
}