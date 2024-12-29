# Gunakan base image Nginx
FROM nginx:alpine

# Pindah ke direktori kerja Nginx
WORKDIR /usr/share/nginx/html

# Hapus file default Nginx
RUN rm -rf ./*

# Salin file proyek Anda ke dalam image
COPY . .

# Expose port 80 untuk akses HTTP
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
