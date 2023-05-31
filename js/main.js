const dsnv = new DanhSachNhanVien();
const validation = new Validation();

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}
function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("DSNV"));
    if (dataLocal !== null) {
        hienthiNV(dataLocal);
        dsnv.mangNV = dataLocal;
    }
}
getLocalStorage();
// Hiển thị nhân viên
function hienthiNV(mang) {
    var content = "";
    mang.map(function (nv, index) {
        var trNV = `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.loaiNV}</td>
        <td>
                <button class="btn btn-danger pl-3 mb-2" onclick="xoaNhanVien('${nv.taiKhoan}')"  >Xóa</button>
                <button class="btn btn-info " data-toggle="modal" data-target="#myModal" onclick="xemThongTin('${nv.taiKhoan}')" >Xem</button>
            </td>
        </tr>`
        content += trNV;
    })
    document.getElementById("tableDanhSach").innerHTML = content;
}

// Thêm nhân viên
function themNhanVien() {
    var taiKhoan = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mk = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCoBan = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;
    console.log(taiKhoan, ten, email, mk, ngayLam, luongCoBan, chucVu, gioLam);
    var isValid = true;
    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống") && validation.checkNumber(taiKhoan, "tbTKNV", "Tài khoản tối đa 4 - 6 kí số") && validation.checkTaiKhoan(taiKhoan,"tbTKNV", "Đã có mã tài khoản này, vui lòng nhập tài khoản mới!!!",dsnv.mangNV);
    isValid &= validation.checkName(ten, "tbTen", "Tên nhân viên phải là chữ") && validation.checkEmpty(ten, "tbTen", "Tên nhân viên không được để trống");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email phải đúng định dạng");
    isValid &= validation.checkEmpty(mk,"tbMatKhau","Mật khẩu không được để trống") && validation.checkPass(mk,"tbMatKhau","Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống") && validation.checkNgayLam(ngayLam, "tbNgay", "chưa đúng định dạng mm/dd/yyyy");
    isValid &= validation.checkEmpty(luongCoBan, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luongCoBan, "tbLuongCB", "Lương cơ bản 1.000.000 - 20.000.000");
    isValid &= validation.checkEmpty(luongCoBan, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luongCoBan, "tbLuongCB", "Lương cơ bản 1.000.000 - 20.000.000");
    isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không được để trống");
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống") && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm trong tháng từ 80-200 giờ");
    if (isValid) {
        var nv = new nhanVien(taiKhoan, ten, email, mk, ngayLam, luongCoBan, chucVu, gioLam);
        nv.tongLuong();
        nv.loaiNV();
        console.log(nv);
        dsnv.themNV(nv);
        hienthiNV(dsnv.mangNV);
        setLocalStorage();
        resetForm();
    }
}
function xoaNhanVien(tk) {
    dsnv.xoaNV(tk);
    hienthiNV(dsnv.mangNV);
    setLocalStorage();
}

function xemThongTin(tk) {
    var indexFind = dsnv.timIndex(tk);
    if (indexFind > -1) {
        var nvFind = dsnv.mangNV[indexFind]
        document.getElementById("tknv").value = nvFind.taiKhoan;
        document.getElementById("tknv").disabled = true;
        document.getElementById("name").value = nvFind.hoTen;
        document.getElementById("email").value = nvFind.email; 
        document.getElementById("password").value = nvFind.matKhau;
        document.getElementById("datepicker").value = nvFind.ngayLam;
        document.getElementById("luongCB").value = nvFind.luongCoBan;
        document.getElementById("chucvu").value = nvFind.chucVu;
        document.getElementById("gioLam").value = nvFind.gioLam;
    }
}
function resetForm() {
    document.getElementById("formNV").reset();
    document.getElementById("tknv").disabled = false;

    //nếu ko có thẻ form
    // document.getElementById("txtMaSV").value = ""
}
function capNhatNV(){
    var taiKhoan = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mk = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCoBan = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;
    // console.log(taiKhoan, ten, email, mk, ngayLam, luongCoBan, chucVu, gioLam);
    var isValid = true;
    isValid &= validation.checkName(ten, "tbTen", "Tên nhân viên phải là chữ") && validation.checkEmpty(ten, "tbTen", "Tên nhân viên không được để trống");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email phải đúng định dạng");
    isValid &= validation.checkEmpty(mk,"tbMatKhau","Mật khẩu không được để trống") && validation.checkPass(mk,"tbMatKhau","Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống") && validation.checkNgayLam(ngayLam, "tbNgay", "chưa đúng định dạng mm/dd/yyyy");
    isValid &= validation.checkEmpty(luongCoBan, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luongCoBan, "tbLuongCB", "Lương cơ bản 1.000.000 - 20.000.000");
    isValid &= validation.checkEmpty(luongCoBan, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luongCoBan, "tbLuongCB", "Lương cơ bản 1.000.000 - 20.000.000");
    isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không được để trống");
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống") && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm trong tháng từ 80-200 giờ");
    if (isValid) {
        var nv = new nhanVien(taiKhoan, ten, email, mk, ngayLam, luongCoBan, chucVu, gioLam);
        nv.tongLuong();
        nv.loaiNV();
        var result = dsnv.capNhat(nv);
        if(result){
            setLocalStorage();
            hienthiNV(dsnv.mangNV);
            resetForm();
           alert("Cập nhật thành công");

        }
        else{
            alert("Cập nhật nhân viên thất bại!!!")
        }
    }
}
document.getElementById("searchName").onkeyup = function(){
    var loaiTim = document.getElementById("searchName").value;
    var mangTK = dsnv.timKiemTheoLoai(loaiTim);
    hienthiNV(mangTK);
}