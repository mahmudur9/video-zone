using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class ProcessFile
    {
        public static void ResizeAndUpload(string path, IFormFile file)
        {
            Image imageFile = Image.FromStream(file.OpenReadStream(), true, true);

            int width = 600;
            int height = 600;
            double imageWidth = imageFile.Width;
            double imageHeight = imageFile.Height;
            double ratio = 0;

            if (imageWidth > imageHeight)
            {
                ratio = imageWidth / imageHeight;
                height = (int)(width / ratio);
            }
            else if (imageWidth < imageHeight)
            {
                ratio = imageHeight / imageWidth;
                width = (int)(height / ratio);
            }

            var newImage = new Bitmap(width, height);
            using (var g = Graphics.FromImage(newImage))
            {
                g.DrawImage(imageFile, 0, 0, width, height);
                newImage.Save(path);
            }
        }

        public static void UploadVideo(string path, IFormFile file)
        {
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
        }

        public async Task UploadVideoAsync(string path, IFormFile file)
        {
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }
}
