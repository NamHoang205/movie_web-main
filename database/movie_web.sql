-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql100.infinityfree.com
-- Thời gian đã tạo: Th12 16, 2025 lúc 09:56 AM
-- Phiên bản máy phục vụ: 10.6.22-MariaDB
-- Phiên bản PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `if0_40212667_movie_web`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`user_id`, `movie_id`) VALUES
(1, 4),
(1, 6),
(1, 17),
(1, 18),
(1, 19),
(1, 24),
(5, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `duration_min` int(11) DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `trailer_url` varchar(255) NOT NULL,
  `movie_source_url` text DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `director` varchar(100) DEFAULT NULL,
  `actors` text DEFAULT NULL,
  `release_year` int(4) DEFAULT NULL,
  `views` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `movies`
--

INSERT INTO `movies` (`id`, `title`, `genre`, `duration_min`, `poster_url`, `description`, `trailer_url`, `movie_source_url`, `country`, `director`, `actors`, `release_year`, `views`) VALUES
(1, 'Venom', 'Khoa Học, Hành Động , Anh Hùng', 120, '../img/m1.jpg', 'Chàng phóng viên Eddie Brock bí mật theo dõi âm mưu xấu xa của một tập đoàn, nhưng không ngờ lại nhiễm phải symbiote, một sinh vật ngoài hành tinh và trở thành quái vật Venom đầy nguy hiểm.', 'https://www.youtube.com/watch?v=u9Mv98Gr5pY', 'https://s2.phim1280.tv/20231020/A7qmaKRz/index.m3u8', 'Trung Quốc, Âu Mỹ', 'Ruben Fleischer', '	Amelia Young, Ariadne Joseph, Chris O\'Hara, Dee, Emilio Rivera, Jenny Slate, Kurt Yue, Malcolm C. Murray, Melora Walters, Michelle Lee, Michelle Williams, Peggy Lu, Reid Scott, Riz Ahmed, Scott Haze, Sope Aluko, Tom Hardy, Wayne Pére, Woody Harrelson', 2018, 1),
(2, 'Dunkirk', 'Chiến Tranh, Hành Động, Chính Kịch', 120, '../img/m2.jpg', 'Phim kể về Khối Đồng minh từ Anh, Bỉ, Canada, và Pháp bị quân Đức bao vây trên bờ biển Dunkirk và cuộc di tản trong Chiến dịch Dynamo trong khoảng thời gian từ ngày 26 tháng 5 đến ngày 4 tháng 6 năm 1940, trong giai đoạn đầu của Chiến tranh thế giới thứ hai.', 'https://www.youtube.com/watch?v=F-eMt3SrfFU', 'https://s2.phim1280.tv/20230919/jsyPyi1Q/index.m3u8', 'Anh', 'Christopher Nolan', 'Aneurin Barnard, Barry Keoghan, Cillian Murphy, Damien Bonnard, Fionn Whitehead, Harry Styles, Kenneth Branagh, Lee Armstrong, Mark Rylance, Tom Hardy', 2017, 4),
(3, 'Batman Vs Superman', 'Khoa Học, Viễn Tưởng, Hành Động, Hoạt Hình, Bí Ẩn', 145, '../img/m3.jpg', 'Bộ phim sẽ xoay quanh cuộc đối đầu của vị hiệp sĩ mạnh mẽ, đáng gờm nhất của thành phố Gotham với biểu tượng được tôn sùng nhất của thành phố Metropolis. Nguyên nhân của “cuộc chiến” này bắt nguồn từ việc họ đang lo lắng vì không thể kiểm soát được siêu anh hùng mới có sức mạnh thần thánh. Tuy nhiên, trong lúc họ “mải miết” chiến đấu với nhau thì có một mối đe dọa khác đã nổi lên và đẩy nhân loại vào tình thế nguy hiểm hơn bao giờ hết.', 'https://www.youtube.com/watch?v=0WWzgGyAH6Y', 'https://s2.phim1280.tv/20231020/8DpQv4I7/index.m3u8\r\n', 'Âu Mỹ', 'Jay Oliva', 'Ariel Winter, Carlos Alazraqui, Cathy Cavadini, David Selby, Dee Bradley Baker, Gary Anthony Sturgis, Gary Anthony Williams, Gr, Grey DeLisle, Maria Canals-Barrera, Michael McKean, Paget Brewster, Peter Weller, Rob Paulsen, Townsend Coleman, Wade Williams', 2012, 2),
(4, 'John Wick 2', 'Hành Động, Tâm Lý, Hình Sự', 122, '../img/m4.jpg', 'Tiếp nối phần 2. Sau khi trở lại thế giới ngầm tội phạm để trả nợ, John Wick phát hiện ra rằng một khoản tiền thưởng lớn đã được đặt lên mạng sống của mình.', 'https://www.youtube.com/watch?v=ChpLV9AMqm4', 'https://s2.phim1280.tv/20231112/DjLyaBpR/index.m3u8', 'Âu Mỹ', '	Chad Stahelski', 'Bridget Moynahan, Claudia Gerini, Common, Franco Nero, Ian McShane, John Leguizamo, Keanu Reeves, Lance Reddick, Laurence Fishburne, Luca Mosca, Peter Serafinowicz, Peter Stormare, Riccardo Scamarcio, Ruby Rose, Thomas Sadoski, Tobias Segal, Wass Stevens', 2017, 1),
(5, 'Aquaman', '	Hành Động, Viễn Tưởng, Phiêu Lưu', 120, '../img/m5.jpg', 'Người Cá.', 'https://www.youtube.com/watch?v=WDkg3h8PCVU', 'https://s2.phim1280.tv/20240123/nWzSojhb/index.m3u8', 'Âu Mỹ', 'James Wan', '	Amber Heard, Djimon Hounsou, Dolph Lundgren, Graham Mctavish, Jason Momoa, Leigh Whannell, Ludi Lin, Michael Beach, Nicole Kidman, Patrick Wilson, Randall Park, Sophia Forrest, Tainui Kirkwood, Tamor, Temuera Morrison, Willem Dafoe, Yahya Abdul-Mateen Ii', 2018, 1),
(6, 'Black Panther', 'Hành Động, Phiêu Lưu, Khoa Học, Viễn Tưởng', 120, '../img/m6.jpg', 'Chiến binh báo đen WAKANDA FOREVER!', 'https://www.youtube.com/watch?v=xjDjIWPwcPU', 'https://s1.phim1280.tv/20231020/XqCl2z2n/index.m3u8', 'Âu Mỹ', 'Ryan Coogler', 'Andy Serkis, Angela Bassett, Chadwick Boseman, Danai Gurira, Daniel Kaluuya, David S. Lee, Florence Kasumba, Forest Whitaker, I, John Kani, Letitia Wright, Lupita Nyong\'o, Martin Freeman, Michael B. Jordan, Nabiyah Be, Sterling K. Brown, Winston Duke', 2018, 2),
(7, 'Thor', '	Phiêu Lưu, Viễn Tưởng, Hành Động, Tâm Lý', 120, '../img/m7.jpg', 'THần Sấm', 'https://www.youtube.com/watch?v=JOddp-nlNvQ', 'https://s6.kkphimplayer6.com/20250923/eeRpOwbc/index.m3u8', 'Âu Mỹ', '	Kenneth Branagh', '	Adriana Barraza, Anthony Hopkins, Chris Hemsworth, Clark Gregg, Colm Feore, Idris Elba, Jaimie Alexander, Josh Dallas, Kat Dennings, Maximiliano Hernández, Natalie Portman, Ray Stevenson, Rene Russo, Rich, Stellan Skarsgård, Tadanobu Asano, Tom Hiddleston', 2011, 1),
(8, 'Bumblebee', 'Hành Động, Phiêu Lưu, Khoa Học', 98, 'https://phimapi.com/image.php?url=https://phimimg.com/upload/vod/20231023-1/01bdd83bcaae31bef3bb6b022a122b18.jpg', 'Robot Bien Hinh', 'https://www.youtube.com/watch?v=lcwmDAYt22k', 'https://s2.phim1280.tv/20231024/q7MPFxoY/index.m3u8', 'Âu Mỹ', 'Travis Knight', 'Fred Dryer, Glynn Turman, Gracie Dzienny, Hailee Steinfeld, Isabelle Ellingson, Jason Ian Drucker, John Cena, John Ortiz, Jorge Lendeborg Jr., Kollin Holtz, Len Cariou, Lenny Jacobson, Megyn Price, Mika Kubo, Pamela Adlon, Ricardo Hoyos, Stephen Schneider', 2019, 5),
(9, 'Mortal Engines', 'Phiêu Lưu, Khoa Học, Viễn Tưởng', 120, '../img/m9.jpg', 'Cỗ Máy Tử Thần lấy bối cảnh thế giới hậu tận thế khi các thành phố bắt đầu tàn lụi, con người phải tập thích nghi để tồn tại trong hoàn cảnh các nguồn tài nguyên đã cạn kiệt. Tại Traction City, anh chàng Tom Natsworthy gặp gỡ một cô gái ngoại lai bí ẩn tên Hester Shaw. Hai nhân vật với hai nét tính cách hoàn toàn đối lập vô tình bị đẩy vào cuộc hành trình đương đầu với các thế lực nguy hiểm để giành lấy quyền lực và tiếp tục sự sống.', 'https://www.youtube.com/watch?v=IRsFc2gguEg', 'https://s2.phim1280.tv/20231031/4833VNi8/index.m3u8', 'New Zealand, Âu Mỹ', 'Christian Rivers', 'Andrew Lees, Colin Salmon, Frankie Adams, Hera Hilmar, Hugo Weaving, Jihae, Kahn West, Kee Chan, Leifur Sigurdarson, Leila George, Mark Mitchinson, Menik Gooneratne, Patrick Malahide, Regé-Jean Page, Robert Sheehan, Ronan Raftery, Sophie Cox, Stephen Lang', 2021, 2),
(10, 'Underworld Blood', 'Giả Tượng, Hành Động, Tâm Lý, Kinh Dị', 120, '../img/m10.jpg', 'Sau các sự kiện của phần phim trước, Selene phải che giấu tung tích Eve, con gái của mình, bởi dòng máu lai đặc biệt mà cô bé nắm giữ. Quá chán nản tình cảnh bị săn đuổi bởi cả 2 giống loài nhằm sử dụng máu của cô để trở nên mạnh hơn, Selene cùng 2 đồng minh mới là David và cha của anh, Thomas, quyết định chấm dứt cuộc chiến kéo dài hàng trăm năm giữa Người sói và Ma cà rồng dù cái giá phải trả có thể là mạng sống của cô.', 'https://www.youtube.com/watch?v=rKHL5PyAPzs', 'https://s1.phim1280.tv/20231209/3DMrXaH0/index.m3u8', 'Âu Mỹ', 'Anna Foerster', 'Bradley James, Brian Caspe, Charles Dance, Clementine Nicholson, Daisy Head, Dan Bradford, David Bowles, James Faulkner, Jan Nemejovský, Kate Beckinsale, Lara Pulver, Oliver Stark, Peter Andersson, Sveta Driga, Theo James, Tobias Menzies, Zuzana Stivínová', 2017, 1),
(11, 'Johnny English', 'Hành Động, Phiêu Lưu, Hài Hước, Tâm Lý', 90, '../img/coming1.jpg', 'Sau khi một cuộc tấn công mạng làm lộ danh tính mọi đặc vụ chìm ở Anh, một cựu điệp viên mù công nghệ đã nghỉ hưu liền tái xuất để tóm tên hacker.', 'https://www.youtube.com/watch?v=TFt6Pxe7AZg', 'https://s6.kkphimplayer6.com/20250828/JCBcQCer/index.m3u8', 'Anh, Âu Mỹ', 'David Kerr', 'Adam Greaves-Neal, Adam James, Alfie Kennedy, Ben Miller, Charles Dance, Edward Fox, Emma Thompson, George Turner, Jake Lacy, Jasmine Brightmore, Kendra Mei, Kevin Eldon, Michael Gambon, Nifemi B, Noah Spiers, Olga Kurylenko, Rowan Atkinson, Rua Robertson', 2018, 1),
(12, 'Warcraft', '	Hành Động, Phiêu Lưu, Giả Tượng', 124, '../img/coming2.jpg', 'Vương quốc yên bình của Azeroth đứng bên bờ vực chiến tranh khi nền văn minh của nó phải đối mặt với một chủng tộc xâm lược đáng sợ: những chiến binh orc chạy trốn khỏi ngôi nhà đang chết của họ để xâm chiếm thuộc địa khác. Khi một cánh cổng mở ra để kết nối hai thế giới, một đội quân phải đối mặt với sự hủy diệt và những người khác phải đối mặt với sự tuyệt chủng. Từ hai phía đối nghịch, hai anh hùng được đặt vào một khóa học va chạm sẽ quyết định số phận của gia đình, người dân và nhà của họ.', 'https://www.youtube.com/watch?v=2Rxoz13Bthc', 'https://s1.phim1280.tv/20231130/UUBAls7h/index.m3u8', 'Âu Mỹ', '	Duncan Jones', 'Anna Galvin, Ben Foster, Ben Schnetzer, Burkely Duffield, Callum Keith Rennie, Clancy Brown, Daniel Wu, Dean Redman, Dominic Cooper, Elena Wur, Glenn Ennis, Paula Patton, Robert Kazinsky, Ruth Negga, Ryan Robbins, Terry Notary, Toby Kebbell, Travis Fimmel', 2016, 6),
(13, 'Rampage', 'Hành Động, Phiêu Lưu, Khoa Học', 133, '../img/coming3.jpg', 'Bộ phim kể về nhà sinh vật học Davis Okoye có mối liên kết khăng khít với George - một chú gorilla lưng bạc được anh chăm sóc từ nhỏ. Một thí nghiệm đột biến ngoài ý muốn đã làm biến đổi gorilla thành quái vật khổng lồ hung hăng. Gorilla cùng những sinh vật bị biến đổi khác đã tấn công con người và đẩy nhân loại đứng trước hiểm họa diệt vong. Liệu Davis Okoye sẽ làm gì để giành chiến thắng, không chỉ để ngăn chặn một thảm họa toàn cầu, mà còn để cứu gorilla đã từng là bạn tốt của mình?', 'https://www.youtube.com/watch?v=coOKvrsmQiI', 'https://s1.phim1280.tv/20231022/qD132OkW/index.m3u8', 'Âu Mỹ', 'Brad Peyton', 'Allys, Breanne Hill, Bruce Blackshear, Demetrius Grosse, Dwayne Johnson, Jack Quaid, Jake Lacy, Jason Liles, Jeffrey Dean Morgan, Joe Manganiello, Mac Wells, Malin Åkerman, Marley Shelton, Matt Gerald, Naomie Harris, P.J. Byrne, Urijah Faber, Will Yun Lee', 2018, 7),
(14, 'Iron Lady', 'Tâm Lý', 99, '../img/coming4.jpg', 'Bộ phim kể câu chuyện về Margaret Thatcher - cựu thủ tướng Anh, người đã vượt qua mọi rào cản về giới tính và tầng lớp xã hội để có được vị trí chính trị trong một xã hội nam quyền. Chuyện phim còn đề cập đến những vấn đề về quyền lực và những cái giá phải trả cho quyền lực trong khi mô tả bức chân dung chân thực nhất về người phụ nữ phi thường này...\n\n\n', 'https://www.youtube.com/watch?v=jX398kx-OCM', 'https://s2.phim1280.tv/20240301/a2L26iqw/index.m3u8', 'Anh , Pháp', 'Phyllida Lloyd', '	Jim Broadbent, Meryl Streep, Richard E. Grant', 2012, 5),
(15, 'Justice League', 'Hành Động, Phiêu Lưu, Khoa Học, Viễn Tưởng, Chính Kịch, Tâm Lý', 120, '../img/coming5.jpg', 'Justice League hay còn được biết đến với cái tên Liên Minh Công Lý, là tập hợp những siêu anh hùng mang trong mình sức mạnh phi thường để giải cứu thế giới khỏi những thế lực đen tối trong vũ trụ DC. Lần này, nhân loại phải đối mặt với tên ác quỷ vô cùng tàn độc – Steppenwolf. Hắn là một trong những tay sai đắc lực của Darksied – một ác nhân và cũng chính là kẻ thù lớn nhất của Liên Minh Công Lý.  Steppenwolf đã phô trương năng lực siêu phàm của mình, gieo rắc nỗi sợ hãi và bóng tối tới xứ Themyscira – quê hương của Wonder Woman và loài người.\n\n\n', 'https://www.youtube.com/watch?v=3cxixDgHUYw', 'https://s1.phim1280.tv/20231021/WgryqYct/index.m3u8', 'Âu Mỹ', 'Joss Whedon, Zack Snyder', '	Amber Heard, Amy Adams, Ben Affleck, Ciarán Hinds, Connie Nielsen, David Thewlis, Diane Lane, Ezra Miller, Gal Gadot, Henry Cavill, Ingvar E. Sigurðsson, J.K. Simmons, Jason Momoa, Jeremy Irons, Joe Morton, Lisa Loven Kongsli, Ray Fisher, Sergi Constance', 2017, 6),
(16, 'Doctor Strange', 'Hành Động, Phiêu Lưu, Viễn Tưởng, Tâm Lý, Chính Kịch', 115, '../img/coming6.jpeg', 'DOCTOR STRANGE là câu chuyện về bác sĩ Giải Phẫu Thần Kinh tên Stephen Vincent Strange. Cuộc đời anh thay đổi từ sau một tai nạn xe hơi khủng khiếp. Sau tai nạn đó, Stephen nhận ra mình có những năng lực bí ẩn cũng như biết thêm về thế giới ma thuật huyền bí. Từ một vị bác sĩ bình thường, Stephen Strange dần nhận được nhiều siêu năng lực để cứu trái đất khỏi những tai họa.\n\n\n', 'https://www.youtube.com/watch?v=HSzx-zryEgM', 'https://s6.kkphimplayer6.com/20250708/nIyFyZVa/index.m3u8', 'Âu Mỹ', 'Scott Derrickson', '	Alaa Safi, Benedict Cumberbatch, Benedict Wong, Benjamin Bratt, Chiwetel Ejiofor, Katrina Durden, Linda Louise Duan, Mads Mikkelsen, Mark Anthony B, Michael Stuhlbarg, Rachel McAdams, Scott Adkins, Tilda Swinton, Topo Wresniwiro, Umit Ulgen, Zara Phythian', 2016, 2),
(17, 'Captain Marvel', 'Hành Động, Phiêu Lưu, Khoa Học, Viễn Tưởng, Chính Kịch, Tâm Lý', 124, '../img/coming7.jpg', 'Từ xa xưa, hai tộc Kree và Skrulls đã xảy ra cuộc chiến tranh kéo dài rất lâu, gọi là Chiến tranh Kree–Skrull. Với trình độ kĩ thuật phát triển, người Kree dần áp đảo trong cuộc chiến và khiến cho số lượng người Skrulls bị giảm đi đáng kể.  Năm 1995, Vers thức giấc tại Hala, quê hương của Đế chế Kree. Cô luôn bị ác mộng về một vụ rơi máy bay, và về một người phụ nữ bị sát hại trước mặt mình. Trí nhớ của cô dừng lại tại thời điểm cô đạt được sức mạnh của mình. Cô được Yon-Rogg, thủ lĩnh của Starforce huấn luyện để trở thành thành viên của đội. Mặc dù Yon-Rogg tin rằng cô đã sẵn sàng nhưng Supreme Intelligence, một trí tuệ nhân tạo có vai trò điều hành Đế chế Kree lại không cho cô gia nhập đội, nơi mà có Minn-Erva - một xạ thủ bắn tỉa và các cộng sự Korath, Bron-Char và Att-Lass.\n\n\n', 'https://www.youtube.com/watch?v=Z1BCujX3pw8', 'https://s6.kkphimplayer6.com/20250921/vgSYJ1nb/index.m3u8', 'Âu Mỹ', 'Anna Boden, Ryan Fleck', 'Akira Akbar, Algenis Perez Soto, Annette Bening, Ben Mendelsohn, Brie Larson, Chuku Modu, Clark Gregg, Colin Ford, Djimon Hounsou, Gemma Chan, Jude Law, Kenne, Lashana Lynch, Lee Pace, Matthew Maher, Mckenna Grace, Rune Temte, Samuel L. Jackson, Vik Sahay', 2019, 7),
(18, 'Black Widow', 'Hành Động, Phiêu Lưu, Khoa Học', 121, '../img/coming8.jpg', 'Phần phim riêng của Natasha Romanoff bất ngờ tung teaser chính thức với những cảnh hành động mãn nhãn, mang đậm chất điệp viên. Bên cạnh đó, phần phim này cũng sẽ hé lộ quá khứ đen tối và quá trình biến cô trở thành một Black Widow.\n\n\n', 'https://www.youtube.com/watch?v=ybji16u608U', 'https://s2.phim1280.tv/20231020/JkJyVMKd/index.m3u8', 'Âu Mỹ', 'Cate Shortland', 'C.C. Smiff, David Harbour, Ever Anderson, Florence Pugh, Lewis Young, Liani Samuel, Michelle Lee, Nanna Blondell, O.T. Fagbenle, Olga Kurylenko, Rachel Weisz, Ray Winstone, Ryan Kiera Armstrong, Scarlett Johansson, Simona Zivk, Violet McGraw, William Hurt', 2021, 4),
(19, 'Ant-Man', 'Khoa Học, Viễn Tưởng, Hành Động, Phiêu Lưu, Tâm Lý', 117, '../img/coming9.jpg', 'Câu chuyện bắt đầu từ giáo sư Hank Pym (Michael Douglas thủ vai), Người Kiến đầu tiên với phát minh vĩ đại là bộ giáp biến đổi kích cỡ con người. Không chỉ thu nhỏ cơ thể để chiến đấu linh hoạt, bộ giáp siêu hạng còn đem lại những năng lực đặc biệt như trò chuyện với kiến, di chuyển với tốc độ nhanh. Nhưng thật không may, công nghệ tạo ra bộ giáp đã bị Darren Cross (Yellowjacket) chiếm đoạt và đưa vào sản xuất hàng loạt. Tất nhiên, “nếu trao quyền năng của Thượng đế cho tất cả mọi người thì thế giới này sẽ trở nên hỗn loạn”. Để ngăn chặn mối nguy hại đến từ Yellowjacket, giáo sư Hank Pym cùng trợ thủ Hope van Dyne (Evangeline Lilly thủ vai) đã tìm đến Scott Lang – một tên trộm vặt lừng danh từng vào tù ra tội, để nhờ anh lấy lại công nghệ đặc biệt và ngăn chặn Yellowjacket. Scott đã trở thành Người Kiến tiếp theo, bắt đầu làm quen với việc điều khiển bộ giáp và sử dụng các siêu năng lực đặc biệt.\n\n\n', 'https://www.youtube.com/watch?v=pWdKf3MneyI', 'https://s6.kkphimplayer6.com/20250919/ygpMTu3U/index.m3u8', 'Âu Mỹ', 'Peyton Reed', 'Abby Ryder Fortson, Anthony Mackie, Bobby Cannavale, Corey Stoll, David Dastmalchian, Evangeline Lilly, Garrett Morris, Gregg Turkington, Hayley Atwell, John Slattery, Judy Greer, Martin Donovan, Michael Douglas, Michael Peña, Paul Rudd, T.I., Wood Harris', 2015, 5),
(20, 'Guardians of the Galaxy', 'Hành Động, Phiêu Lưu, Viễn Tưởng, Tâm Lý, Chính Kịch', 144, '../img/coming10.jpg', 'Phim nói về một phi công phản lực được bị mắc kẹt trong không gian, và anh phải đoàn kết một nhóm người ngoài hành tinh để tạo thành một đội quân đủ khả năng đánh bại các mối đe dọa từ vũ trụ. Phim có sự tham gia diễn xuất của Karen Gillan, Bradley Cooper, Zoe Saldana… và sự chỉ đạo của đạo diễn James Gunn.\n\n\n', 'https://www.youtube.com/watch?v=d96cjJhvlMA', 'https://s6.kkphimplayer6.com/20250917/mI9YO8eU/index.m3u8', 'Âu Mỹ', 'James Gunn', 'Benicio del Toro, Bradley Cooper, Chris Pratt, Christopher Fairbank, Dave Bautista, Djimon Hounsou, Glenn Close, John C. Reilly, Karen Gillan, Krystian Godlew, Laura Haddock, Lee Pace, Michael Rooker, Peter Serafinowicz, Sean Gunn, Vin Diesel, Zoe Saldaña', 2014, 7),
(21, 'Chainsaw Man - The Movie: Chương Reze', 'Hành Động, Tình Cảm, Viễn Tưởng , Hoạt Hình', 100, 'https://phimapi.com/image.php?url=https://phimimg.com/upload/vod/20251209-1/69d2d97349877280293f7c1ccc9efdb4.jpg', 'Tiếp nối series anime chuyển thể đình đám, Chainsaw Man lần đầu tiên oanh tạc màn ảnh rộng trong một cuộc phiêu lưu hoành tráng, ngập tràn các phân cảnh hành động. Ở phần trước, ta đã biết Denji từng làm Thợ Săn Quỷ cho yakuza để trả món nợ của cha mẹ nhưng bị họ phản bội và trừ khử. Trong khoảnh khắc hấp hối, chú chó quỷ cưa máy Pochita (người bạn đồng hành trung thành của Denji) đã đưa ra một khế ước, cứu sống cậu và hợp thể cùng cậu. Từ đó, một Quỷ Cưa bất khả chiến bại ra đời. Giờ đây ở Chainsaw Man – The Movie: Chương Reze, trong cuộc chiến tàn khốc giữa quỷ dữ, thợ săn quỷ và những kẻ thù trong bóng tối, một cô gái bí ẩn tên Reze xuất hiện trong thế giới của Denji. Denji buộc phải đối mặt với trận chiến sinh tử khốc liệt nhất của mình, một trận chiến được tiếp sức bởi tình yêu trong một thế giới nơi mọi người phải sinh tồn mà không biết bất kỳ luật lệ nào.\n\n\n', 'https://www.youtube.com/watch?v=tAzAhDNdehs', 'https://s6.kkphimplayer6.com/20251209/WMrZGJvG/index.m3u8', 'Nhật Bản', 'Tatsuya Yoshihara', 'Eri Kitamura, Fairouz Ai, Hidenori Takahashi, Karin Takahashi, Kenichi Ono, Kenji Akabane, Kenji Nomura, Kenjiro Tsuda, Kikunosuke Toya, Maaya Uchida, Marina Inoue, Natsuki Hanae, Reina Ueda, Shiori Izawa, Shogo Sakata, Tomori Kusunoki, Yuhk, Yuuya Uchida', 2025, 14),
(24, 'Doraemon: Nobita Và Cuộc Phiêu Lưu Vào Thế Giới Trong Tranh', 'Gia Đình, Phiêu Lưu, Viễn Tưởng, Tâm Lý', 106, 'https://phimapi.com/image.php?url=https://phimimg.com/upload/vod/20250827-1/f4c07090d886ae98ebfb1f9222ace35f.jpg', 'Câu chuyện kể về hòn đá \"Arturia\" khoảng thời gian Châu Âu Thế Kỷ 13 | Công Quốc \"ARTURIA\". Tại đây đã xảy ra nhiều hiện tượng kỳ lạ từ thế giới trong tranh.\n\n\n', 'https://www.youtube.com/watch?v=x97LAn84wkY', 'https://s6.kkphimplayer6.com/20250827/JfkCJsGc/index.m3u8', 'Nhật Bản', 'Yukiyo Teramoto', 'Atsumi Tanezaki, Megumi Oohara, Miki Fujimoto, Mikio Date, Misaki Kuno, Misaki Watada, Ouji Suzuka, Subaru Kimura, Takeshi Tomizawa, Tomokazu Seki, Wasabi Mizuta, Yumi Kakazu', 2025, 30);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `created_at`) VALUES
(19, 'admin@gmail.com', '6d9abda44349329809c53b86bf60056321696f9188401e6f1b8988ba727c0777', '2025-12-16 08:53:34'),
(26, 'dat2722005@gmail.com', '5708e189c5ad8e1f98095001d74f5d6dba6bbb23fe789a4cb305dab69bfa148a', '2025-12-16 09:09:15'),
(34, 'nguyenngocmanh242k5@gmail.com', '4263707c6defbd6f3d0490491059b22ac3ad6186583a83c15e380074d2d7192c', '2025-12-16 09:21:37'),
(36, 'clacce18@gmail.com', 'b11af7bfc3397a09d260285e711c007e6a2af8a112d732f343ce12508dfd2cc0', '2025-12-16 09:24:42'),
(37, 'nh1897702@gmail.com', '401bb5871f0dbddc68ac508695672747e6857c8e53f123ed99ec0321f9d56e71', '2025-12-16 09:25:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `movie_id`, `user_id`, `username`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 1, 'admin', 5, 'Dat', '2025-10-13 02:35:51'),
(2, 1, 1, 'admin', 4, 'Dat Dep trai qua', '2025-10-13 02:36:13'),
(3, 8, 1, 'admin', 5, '10/10 Khong co gi de che\n', '2025-10-13 15:04:29'),
(4, 2, 1, 'admin', 3, 'Phim hay nhung van cho 3 sao', '2025-10-13 15:06:54'),
(5, 3, 1, 'admin', 4, 'tru 1 sao vi batman', '2025-10-13 15:07:24'),
(6, 14, 1, 'admin', 5, 'Một kiệt tác để đời', '2025-12-09 16:27:44'),
(7, 14, 1, 'admin', 5, 'Một kiệt tác để đời', '2025-12-09 16:27:50'),
(8, 13, 1, 'admin', 5, 'Nên xem', '2025-12-09 16:28:16'),
(9, 21, 1, 'admin', 4, 'Tôi chút nữa thì bật khóc ở phân cảnh cuối , bộ phim thật cảm động', '2025-12-09 17:53:40'),
(10, 21, 4, 'toilaai', 4, 'Khóc :((((((((', '2025-12-10 01:39:06'),
(11, 21, 5, 'ketoan', 5, 'Ước gì reze nói sớm hơn', '2025-12-10 01:50:52'),
(12, 24, 1, 'admin', 5, 'phim rất hay\n', '2025-12-16 01:59:44'),
(13, 24, 1, 'admin', 5, 'Phim giúp tôi quay lại với tuổi thơ\n', '2025-12-16 02:00:13'),
(14, 24, 6, 'dung123', 5, 'Doremon trông đáng yêu thế\n', '2025-12-16 02:07:38'),
(15, 24, 6, 'dung123', 5, 'Phim thật tuyệt vời', '2025-12-16 02:07:54'),
(16, 20, 6, 'dung123', 4, 'phim cũm ổn\n', '2025-12-16 03:15:54'),
(17, 12, 6, 'dung123', 3, 'phim tạm', '2025-12-16 03:16:13'),
(18, 15, 6, 'dung123', 5, 'batman quá ngầu\n', '2025-12-16 03:16:37'),
(19, 24, 9, 'test123', 5, 'phim hay', '2025-12-16 09:06:55'),
(20, 24, 1, 'admin', 5, 'phim quá hay\n', '2025-12-16 09:33:03'),
(21, 21, 1, 'admin', 5, 'phim hay quá\n', '2025-12-16 10:11:20'),
(22, 17, 1, 'admin', 1, 'phim nữ quyền vậy', '2025-12-16 10:14:00'),
(23, 19, 6, 'dung123', 5, 'người kiến đẹp trai quá\n', '2025-12-16 10:14:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2y$10$EUoBoqcxT6UrO5pMdng92ODHALgAF4vvcsju9COXUqARGHvDhTkIm', 'admin', '2025-10-11 14:40:52'),
(2, 'dat2722005', 'dat2722005@gmail.com', '$2y$10$u0rqtsRN2OL7xPOEWG5eFuSbVEo08cijSRMz.TfPDs0Oc3Ugry/Za', 'admin', '2025-10-13 00:59:25'),
(3, 'captaiiin', 'captaiiin@gmail.com', '$2y$10$qod495v1Kt3tNsqi8giquOWmggk5.zZPeL7E0BLS97dONennf6Jhy', 'admin', '2025-10-29 11:43:54'),
(4, 'toilaai', 'toilaai@gmail.com', '$2y$10$xMJaX0VYY6m5syPAxw4EKuT6MHTjgONz71JC2XguenMyTC5k6vQq.', 'user', '2025-12-10 01:37:31'),
(5, 'ketoan', 'ketoan@gmail.com', '$2y$10$J7Unq3VRjCkgl2vo0Nu1juduj0D28WSvHmjYFDexRqqCHxIhnUooS', 'user', '2025-12-10 01:50:11'),
(6, 'dung123', 'dung@gmail.com', '$2y$10$jdMRuK6W8MrqwK8brcucPuM5DxMc/9BnQ.ncIhZMQAbMridkKW38G', 'admin', '2025-12-13 10:45:29'),
(7, 'datne', 'japananimevietsub12@gmail.com', '$2y$10$gwEDk83iTqyEIoDOYY9f4uA99EhMwytfJUFN3g7avvl1T1pibcWs.', 'user', '2025-12-16 08:37:56'),
(8, 'nam', 'clacce18@gmail.com', '$2y$10$1.xdLTVlnR9jb4t9l.iGOOrlZVaOBmCT5Lr5cO6fwM1tEiBC1yE6m', 'admin', '2025-12-16 09:06:22'),
(9, 'test123', 'test123@gmail.com', '$2y$10$1i95l/sfeL9nyw4crsG/YeQ/nGYb7mUEIRHFqppu.NMj0NDtHySTK', 'user', '2025-12-16 09:06:22'),
(11, 'test', '2311061200@hunre.edu.vn', '$2y$10$54uB5JttxS1b8/UEP236eORBVELVLP9bw/3a5B.WKJjWZmVjVLA1e', 'user', '2025-12-16 09:09:49'),
(13, 'manh', 'nguyenngocmanh242k5@gmail.com', '$2y$10$iJoNKy0UJg/EYhSm0SD/4O45qJm1zgmUIcqj7xi0Rv1QFYgs9A6vq', 'user', '2025-12-16 09:21:19'),
(14, 'namdz', 'nh1897702@gmail.com', '$2y$10$sW/JyCqH5bxeWhy/1THeEOWGlL1RxJNJFE/6fb7ZLlLz9tpA4sTYu', 'user', '2025-12-16 09:25:42'),
(15, 'nguyentiendat', 'nguyentiendat2722005@gmail.com', '$2y$10$ynT3NB/vH6EqVSvv2oR8uuyGbixFZpTbiRgM0N1H5rCxmLeyfsaym', 'user', '2025-12-16 09:29:17'),
(16, 'namdz123', 'clacce3z@gmail.com', '$2y$10$yXKZ4S2dAcJik0SXFBPBEeJ9wnKH6FelGWG80gATNQVycBQDRYhAS', 'user', '2025-12-16 09:44:09');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`movie_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Chỉ mục cho bảng `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
