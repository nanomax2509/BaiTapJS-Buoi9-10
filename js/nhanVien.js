function nhanVien(taiKhoan,hoTen,email,matKhau,ngayLam,luongCoBan,chucVu,gioLam){
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = function(){
        this.tongLuong= 0;
        if(chucVu === "Sếp"){
            this.tongLuong = this.luongCoBan*3;
        }
        else if(chucVu === "Trưởng phòng"){
            this.tongLuong = this.luongCoBan*2;
        }
        else 
        this.tongLuong = this.luongCoBan;
        return this.tongLuong;
    };
    this.loaiNV = function(){
        this.loaiNV = "";
        if(this.gioLam >=192){
            return this.loaiNV  = "Nhân viên xuất sắc";
        }
        else if(this.gioLam >=167){
            return this.loaiNV  ="Nhân viên giỏi";
        }
        else if(this.gioLam >=160){
            return this.loaiNV ="Nhân viên khá";
        }
        else if(this.gioLam <160){
            return this.loaiNV ="Nhân viên trung bình";
        }
    };
}