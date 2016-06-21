#Tempat Nongkrong Medan
#User :
1. Cari Kafe
2. Lihat detail Kafe
	- Lokasi Kafe
		- Arah dari Lokasi yang di inginkan ke Kafe
	- Daftar Makanan
	- Daftar Minuman
	- Daftar Layanan

#Admin :
1. Input Data Kafe
	- Nama Kafe
	- Deskripsi Kafe
	- Alamat Kafe menggunakan Maps marker
	- Foto-foto kafe
	- Foto makanan, minuman dll beserta harga

2. Update Data Kafe
	- Nama Kafe
	- Deskripsi Kafe
	- Alamat Kafe menggunakan Maps marker
	- Foto-foto kafe
	- Foto makanan, minuman dll beserta harga

3. Hapus Kafe


#Database
1. tbl_kafe
	-> id_kafe (primary_key)
	-> nama_kafe (varchar(50))
	-> deskripsi_kafe (text)
	-> Lat (long/float)
	-> Lng (long/float)
	-> alamat (text)

2. tbl_makanan
	-> id_makanan (PK)
	-> id_kafe (FK)
	-> nama_makanan (varchar(50))
	-> deskripsi (text)
	-> harga (long/float)

3. tbl_minuman
	-> id_minuman (PK)
	-> id_kafe (FK)
	-> nama_minuman (varchar (50))
	-> deskripsi (text)
	-> harga (long/float)

4. tbl_galery
	-> id_galery (PK)
	-> id_kafe (FK)
	-> foto (varchar(50))
	-> deskripsi (text)

5. tbl_layanan
	-> id_layanan (PK)
	-> id_kafe (FK)
	-> wifi (varchar(30))
	-> layanan_lainnya(text)