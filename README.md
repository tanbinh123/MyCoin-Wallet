# MyCoin-Wallet

Họ và tên: Phạm Minh Hoàng - MSSV: 1712460
-----------------------
Bài tập cá nhân Blockchain
Xây dựng hệ thống tiền điện tử MyCoin
Các công nghệ mới trong phát triển phần mềm - CQ2017/3
-----Link demo---------
https://youtube.com

-----Link Github-------
https://github.com/hoangpm6814/MyCoin-Wallet

## Cài đặt modules/dependencies
###`npm install`

## Chạy chương trình
###`npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Các chức năng của project
## Tạo ví
- Chỉ cần dùng tên là có thể tạo ra ví mới
- Ví mới được tạo sẽ có số coin là 0, và chưa nhận hay gửi coin nào.
## Hiển thị ví
- Xem số coin (balance) của ví
- Tên ví
## Xem thống kê tài khoản
- Hiển thị số coin được chuyển và nhận của mỗi ví trong mỗi lần giao dịch với ví khác
## Gởi coin cho một địa chỉ khác
- Gởi tiền điện tử cho các ví trong cùng mạng lưới
- Sử dụng thuật toán Proof of Work (PoW) (hardcode độ khó trong việc đào là 2, có thể chỉnh sửa nếu muốn)
- Nếu chỉ có 1 ví thì không thể chuyển tiền
- Nếu có 2 ví thì sẽ chuyển tiền được nhưng có miner
- Nếu có 3 ví trở lên khi chuyển tiền sẽ tìm được miner (random 1 ví ngẫu nhiên trong các ví còn lại)
- Sau mỗi lần gửi tiền thì mỗi giao dịch sẽ được thêm vào hệ thống blockchain.
## Xem lịch sử giao dịch
- Mỗi giao dịch sau khi được tạo sẽ được thêm vào lịch sử giao dịch.
## Notes:
Vì project này chỉ tạo một coin đơn giản nên tác giả chưa thêm vào những yếu tố phức tạp khác của một coin điển hình như 
- Một Wallet cần phải có public key và private key, muốn thêm một transaction thì phải ký (sign) vào transaction đó
- Thêm transaction được tạo vào pending transactions, sau đó mine block theo độ khó cũng như có mining rewards linh hoạt (thay vì hardcode như project hiện tại)
Các yêu cầu trên hoàn toàn có thể thực hiện được nếu nâng cấp MyCoin này, tuy nhiên, để đơn giản vấn đề tác giả chỉ tạo một Wallet với tên sau đó gửi coin mà thôi, các yếu tố như mining difficulty và mining rewards cũng chỉ được hardcode.

## Tham khảo
- Slide bài giảng thầy Trần Văn Quý
- https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-Qbq5QLE3lD8?fbclid=IwAR2Mfhs0F8LSDB9vL4ovLmp-ufH1jctS0g6rUQl5IGxVDD9vXYPJV_d5W00
- https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-p2-QpmleEX7lrd?fbclid=IwAR1-x0MEHK3TsoVg6FACbR00s8fG_mWE-7fJEPGclt5m95CmyEIc9r31BU0
- https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-p3-1VgZvoRMlAw?fbclid=IwAR2Mfhs0F8LSDB9vL4ovLmp-ufH1jctS0g6rUQl5IGxVDD9vXYPJV_d5W00
- https://github.com/Savjee/savjeecoin-frontend
- https://github.com/tuando24101997/myCoin
- https://www.youtube.com/watch?v=AQV0WNpE_3g&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=1
- https://etherscan.io/
