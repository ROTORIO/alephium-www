---
title: Thiết kế VM thế hệ mới
---

Máy ảo mới (VM) được Alephium thiết kế để giải quyết nhiều vấn đề nghiêm trọng của các nền tảng dApp hiện tại.

VM của Alephium ít sử dụng IO hơn để đảm bảo hiệu suất chưa từng có ở blockchain nào.

Theo thiết kế, flash loan sẽ không khả dụng và VM loại bỏ nhiều tác nhân tấn công của EVM, bao gồm ủy quyền không giới hạn, vần đề nhúng kép, tấn công reentrancy, v.v. 

Cuối cùng, mô hình thực thi stateful UTXO giúp giảm thiểu tình trạng chênh lệch giá không rủi ro.
