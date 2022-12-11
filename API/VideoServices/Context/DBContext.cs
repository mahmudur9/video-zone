using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Models;

namespace VideoServices.Context
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(v => v.Comments)
                .WithOne(v => v.Commenter)
                .HasForeignKey(v => v.CommenterId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<User>()
                .HasMany(v => v.Likes)
                .WithOne(v => v.Liker)
                .HasForeignKey(v => v.LikerId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<User>()
                .HasMany(v => v.Dislikes)
                .WithOne(v => v.Disliker)
                .HasForeignKey(v => v.DislikerId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Dislike> Dislikes { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
