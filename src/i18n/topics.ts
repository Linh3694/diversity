export type TopicVariant = "normal" | "special"

export interface LocalizedContent {
  quote?: string
  title?: string
  paragraphs?: string[]
  bullets?: Array<{ text: string; subBullets?: string[] }>
  outro?: string
  dressCode?: string
}

export interface MonthI18n {
  vi: LocalizedContent
  en: LocalizedContent
  variant?: TopicVariant
  photoSrc?: string
  dressColors?: string[]
  dressImage?: string // New field for dress code images
  dressCode?: {
    vi: string
    en: string
  }
  disabled?: boolean
}

// I18n content keyed by month id (e.g. "2025-08-15")
export const topicsI18n: Record<string, MonthI18n> = {
  "2025-08-15": {
      vi: {
        title: "Mỗi cảm xúc đều có giá trị. Mỗi sắc màu là một phần của bạn.",
        paragraphs: [
          "Hôm nay, hãy chọn màu sắc của mình – và lan tỏa cảm xúc thật một cách tự nhiên, chân thành.\n",
          "Màu vàng tươi: Biểu trưng cho niềm vui và hạnh phúc, mang đến năng lượng tích cực cho mọi người." ,
          "Màu xanh dương đậm: Đại diện cho sự bình tĩnh và thanh thản." ,
          "Màu đỏ tươi: Tượng trưng cho sức sống, sự năng động và quyết tâm, khơi dậy tinh thần chinh phục và bứt phá." ,
          "Màu xám lông chuột: Mang sắc thái trầm lắng, suy tư và nội tâm, tạo khoảng lặng để lắng nghe chính mình." ,
          "Màu tím than: Đại diện cho sự sáng tạo và nét bí ẩn, gợi mở những ý tưởng mới mẻ và chiều sâu cảm xúc." ,
      ],
      },
      en: { paragraphs: [] },
      dressCode: {
        en: "Mặc theo tâm trạng hôm đó – có thể cài mood badge",
        vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
      variant: "normal",
      dressColors: ["#FFD54F", "#0F2A44", "#E53935", "#E0E0E0", "#4A2E83"],
  },
  "2025-08-29": {
    vi: {
      title: "Tự hào Việt Nam",
      paragraphs: [
        "Trang phục có họa tiết: Cờ đỏ - sao vàng, lễ phục, quần áo bộ đội tượng trưng cho niềm tự hào và tình yêu Tổ quốc. Trong tinh thần ấy, We Day – Tự hào Việt Nam là dịp để WISers gửi lời tri ân đến thế hệ đi trước đã dựng xây hòa bình; khẳng định niềm tin vào một thế hệ mới tự chủ – bản lĩnh – giàu lòng nhân văn; và lan tỏa tình yêu đất nước qua những hình ảnh gần gũi, thân thuộc. Ngày Quốc khánh 2/9 không chỉ là dấu mốc lịch sử của đất nước, mà còn nhắc mỗi chúng ta biết ơn, tự hào và biến tình yêu ấy thành động lực học tập, sáng tạo, sống có trách nhiệm – để trở thành chiếc cầu nối giữa quá khứ, hiện tại và tương lai.",
      ],

    },
    en: { paragraphs: [] },
    dressCode: {
        en: "Trang phục có họa tiết: Cờ đỏ - sao vàng, lễ phục, quần áo bộ đội",
        vi: "Trang phục có họa tiết: Cờ đỏ - sao vàng, lễ phục, quần áo bộ đội"
      },
    variant: "normal",
    dressColors: ["#EB1D27", "#FFCC00"],
    dressImage: "/flag-vi.png",
  },
  "2025-09-12": {
    vi: {
      title:"Tune-in Day",
      quote: "Bắt đầu bằng sự hiện diện – Trưởng thành bằng sự kết nối",
      paragraphs: [
        "Trang phục trắng trong Tune-in Day là gam màu của sự khởi đầu cởi mở, không phán xét, để mỗi WISer bắt đầu hành trình mới với trái tim rộng mở và tâm trí an lành Đây là lời nhắc để mỗi WISer mở lòng, lắng nghe chính mình và kết nối với người khác một cách tự nhiên nhất.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
        en: "Màu trắng",
        vi: "Màu trắng"
      },
    variant: "normal",
    dressColors: ["#ffffff"],
  },
  "2025-09-26": {
    vi: {
      title: "Trung thu",
      paragraphs: [
        "Trang phục đỏ, vàng rực rỡ hay những bộ trang phục truyền thống Việt Nam chính là cách Wellspring lan tỏa niềm vui, niềm tự hào và tinh thần cộng đồng trong dịp Trung thu – bên cạnh đèn lồng, múa lân hay bánh nướng, tất cả góp phần gắn kết, sẻ chia và lưu giữ yêu thương.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
        en: "Trang phục màu đỏ, vàng/ trang phục truyền thống Việt Nam",
        vi: "Trang phục màu đỏ, vàng/ trang phục truyền thống Việt Nam"
      },
    variant: "normal",
    dressColors: ["#EB1D27", "#FFCC00"],
    dressImage: "/flag-vi.png",
  },
  "2025-10-10": {
      vi: {
        title: "World Mental Health Day",
        quote: "Be kind to your mind – and to others",
        paragraphs: [
          "Trang phục với câu quote tích cực trên áo gửi gắm thông điệp: tâm trí của bạn luôn cần được quan tâm và chăm sóc. Nhân Ngày Sức khỏe Tinh thần Thế giới (World Mental Health Day), đây là dịp để cùng nhau nâng cao nhận thức về một khía cạnh đôi khi vô hình nhưng ảnh hưởng sâu sắc đến cảm xúc, học tập và cuộc sống hằng ngày. Mỗi người đều có cảm xúc, và cảm xúc nào cũng xứng đáng được lắng nghe. Hãy nhìn nhau bằng ánh mắt cảm thông, nói với nhau những lời ấm áp, và đừng quên tử tế với chính mình. Sức khỏe tinh thần không cần che giấu – mà cần được thấu hiểu. Cùng nhau, WISers sẽ xây dựng một cộng đồng an toàn, tích cực và đầy yêu thương.",
        ],
      },
      en: { paragraphs: [] },
      dressCode: {
        en: "Trang phục có câu quote tích cực in trên áo",
        vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
      variant: "normal",
      dressColors: ["#FFD54F", "#0F2A44", "#E53935", "#E0E0E0", "#4A2E83"],
      dressImage: "/flag-heart.svg",
  },
  "2025-10-31": {
      vi: {
        title: "Halloween",
        quote: "Dare to Be Different – Dám khác biệt để tỏa sáng",
        paragraphs: [
          "Những bộ trang phục hóa trang không chỉ thắp lên bầu không khí huyền bí, rộn ràng của Halloween, mà còn mở ra cơ hội để mỗi WISer bước ra khỏi “vỏ bọc” quen thuộc, dám thử sức với một phiên bản mới mẻ của chính mình. Ở đó, các bạn được mạnh dạn thể hiện cá tính, bung tỏa sáng tạo, đồng thời rèn luyện sự tự tin và tinh thần sẵn sàng thử thách – đúng với tinh thần sống năng động, chủ động khám phá và trải nghiệm.",
        ],
      },
      en: { paragraphs: [] },
      dressCode: {
        en: "Trang phục hóa trang theo chủ đề",
        vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
      variant: "normal",
      dressColors: [],
  },
  "2025-11-28": {
      vi: {
        title: "Thanksgiving Day",
        quote: "Be kind to your mind – and to others",
        paragraphs: [
          "Trang phục với câu quote tích cực trên áo gửi gắm thông điệp: tâm trí của bạn luôn cần được quan tâm và chăm sóc. Nhân Ngày Sức khỏe Tinh thần Thế giới (World Mental Health Day), đây là dịp để cùng nhau nâng cao nhận thức về một khía cạnh đôi khi vô hình nhưng ảnh hưởng sâu sắc đến cảm xúc, học tập và cuộc sống hằng ngày. Mỗi người đều có cảm xúc, và cảm xúc nào cũng xứng đáng được lắng nghe. Hãy nhìn nhau bằng ánh mắt cảm thông, nói với nhau những lời ấm áp, và đừng quên tử tế với chính mình. Sức khỏe tinh thần không cần che giấu – mà cần được thấu hiểu. Cùng nhau, WISers sẽ xây dựng một cộng đồng an toàn, tích cực và đầy yêu thương.",
        ],
      },
      en: { paragraphs: [] },
      dressCode: {
        en: "Trang phục có câu quote tích cực in trên áo",
        vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
      variant: "normal",
      dressColors: ["#E78924", "#5F4141", "#FFEDC9", "#F4A81D"],
  },
  "2025-12-05": {
    vi: {
      title: "Ngày Quốc tế Người tàn tật (3/12)",
      quote: "Thấu cảm là khi trái tim biết lắng nghe hơn cả đôi tai",
      paragraphs: [
        "Màu hồng tượng trưng cho sự ấm áp, dịu dàng và tình thương vô điều kiện. Ngày 3/12, Ngày Quốc tế Người khuyết tật, là lời nhắc để chúng ta lắng nghe những câu chuyện vượt nghịch cảnh, tìm hiểu về những con người vĩ đại dù mang trong mình khiếm khuyết, và nhận ra rằng ý chí, nghị lực, lòng yêu cuộc sống không phụ thuộc vào hoàn cảnh – mà nằm trong lựa chọn của mỗi người.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Màu hồng",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: ["#FF7388"],
  },
  "2025-12-19": {
    vi: {
      title: "Hearts in Motion Day",
      quote: "Khi trái tim cùng chuyển động, thế giới xích lại gần nhau hơn.",
      paragraphs: [
        "Những bộ trang phục truyền thống từ khắp các quốc gia không chỉ rực rỡ sắc màu, mà còn kể những câu chuyện về lịch sử, văn hóa và con người. Mỗi tà áo, mỗi họa tiết là một lời chào thân thiện, một cánh cửa mở để WISers khám phá và trân trọng sự đa dạng. Giữa những trận thể thao sôi nổi và những nụ cười kết nối, trang phục hôm nay nhắc chúng ta rằng: sự khác biệt không chia cách – mà làm thế giới xích lại gần hơn bằng trái tim rộng mở.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục đặc trưng của các nền văn hóa, các nước trên thế giới",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-01-16": {
    vi: {
      title: "Me in We Day",
      quote: "Me in We Day – Mỗi cá nhân là một tuyên ngôn, cả tập thể là sức mạnh",
      paragraphs: [
        "Me in We Day không đơn thuần là mặc đồng phục. \n Đó là ngày bạn đứng trong một tập thể – và vẫn được là chính mình. \n Là ngày những chiếc áo giống nhau không làm mờ cá tính, mà tỏa sáng sự đồng lòng. Là khi bạn nhận ra:\n Tôi mạnh mẽ. Nhưng khi là “chúng tôi” – tôi còn mạnh mẽ hơn.\n Mỗi màu áo hôm nay là một tuyên ngôn:\n Chúng ta khác biệt, nhưng cùng hướng về một mục tiêu.\n Chúng ta độc lập, nhưng không đơn độc.\n Chúng ta là lớp học – và lớp học này không thể thay thế.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục lớp",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-01-30": {
    vi: {
      title: "Sắc Xuân",
      paragraphs: [
        "Áo dài truyền thống hay những trang phục mang gam màu rực rỡ của mùa xuân (đỏ, vàng, hồng, xanh) không chỉ làm bừng sáng không khí lễ hội, mà còn là biểu tượng của sự khởi đầu tươi mới, niềm sum vầy và hy vọng cho một năm mới rực rỡ. Đó cũng là tinh thần của sự kiện “Sắc Xuân – Khởi Đầu Hành Trình Mới”, nơi cộng đồng Wellspring cùng nhau đón Tết cổ truyền, trân trọng những giá trị truyền thống và lan tỏa khát vọng vươn lên. Mỗi WISer như một mầm xanh mang sắc màu riêng biệt, và khi hội tụ, sẽ cùng nhau tạo nên một mùa xuân tràn đầy sức sống, mở ra hành trình mới với vô vàn cơ hội và ước mơ.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Áo dài truyền thống hoặc áo dài cách tân. \n Nếu không mặc áo dài: chọn trang phục hiện đại gọn gàng, với gam màu rực rỡ mang sắc xuân (đỏ, vàng, hồng, xanh).",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-02-27": {
    vi: {
      title: "Ngày Thầy Thuốc Việt Nam",
      quote: "Ngày Thầy thuốc Việt Nam – Tri ân những người mang lại sự sống và sự chữa lành",
      paragraphs: [
        "Không phải ai khoác áo trắng cũng là bác sĩ – nhưng ai biết biết ơn và lan tỏa yêu thương đều có khả năng chữa lành. \n Màu trắng trong Ngày Thầy thuốc Việt Nam không chỉ gợi nhớ đến chiếc áo blouse của người làm nghề y, mà còn là biểu tượng của sự tinh khiết, niềm tin và hy vọng. Đó là lời tri ân gửi tới những người chữa lành – từ bác sĩ, y tá, dược sĩ đến bất kỳ ai từng xoa dịu nỗi đau của người khác bằng sự kiên nhẫn, thấu hiểu và tình thương. Hôm nay, hãy để lòng biết ơn lên tiếng, và để mỗi WISer trở thành một người lan tỏa năng lượng chữa lành. Chữa lành không chỉ đến từ thuốc men, mà còn từ lòng biết ơn, sự tử tế, và tình yêu thương.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục màu trắng",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: ["#FFFFFF"],
  },
  "2026-03-13": {
    vi: {
      title: "Maths Day - Pi Day (14/3)",
      quote: "“Toán học không chỉ là môn học – mà là một niềm vui học thuật đang chờ được khám phá.”",
      paragraphs: [
        "Trong thế giới của những con số, hình học và logic ẩn chứa rất nhiều điều kỳ thú – những “niềm vui học thuật” dành cho những ai đủ tò mò để khám phá. \n Maths Day – Pi Day là dịp để mỗi học sinh thử nhìn Toán học không phải bằng áp lực, mà bằng niềm yêu thích và sự ngạc nhiên. \n Bởi Interested không nhất thiết phải là đam mê lớn – nó có thể bắt đầu từ một câu đố bạn giải được, một con số bạn hiểu ra, một công thức bỗng trở nên thú vị. \n Mỗi đam mê nhỏ là một nhịp sống riêng. Và biết đâu, chính hôm nay, Toán học lại trở thành một mảnh ghép mới trong bạn",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục theo concept “Toán học sống động”",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },  
  "2026-03-20": {
    vi: {
      title: "“Hạnh phúc là có thật – và bắt đầu từ những điều giản dị.”",
      paragraphs: [
        "Ngày Quốc tế Hạnh phúc 20/3 là dịp để chúng ta cùng nhau lan tỏa năng lượng tích cực. Bởi vậy, trang phục hôm nay mang một ý nghĩa đặc biệt: \n - Màu vàng – tượng trưng cho ánh nắng, sự ấm áp và tinh thần lạc quan. \n - Biểu tượng mặt cười – lời nhắc nhở giản dị rằng hạnh phúc đôi khi chỉ là một nụ cười ta trao đi. \n Hãy để chính trang phục bạn chọn trở thành “thông điệp sống” về niềm vui và sự sẻ chia. \n Hạnh phúc không cần điều gì to tát. Nó có thể đến từ một nụ cười bất ngờ, một lời chào buổi sáng, hay ánh mắt đồng cảm khi bạn cần. \n Ngày Quốc tế Hạnh phúc nhắc nhở chúng ta: Đừng chờ đợi điều lớn lao để vui – hãy bắt đầu từ những niềm hạnh phúc nhỏ và lan tỏa nó."
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục màu hồng",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: ["#FFCE02"],
  },
  "2026-03-27": {
    vi: {
      title: "Sporty Soul Friday/ Fitness Day",
      paragraphs: [
        "Hôm nay, trang phục thể thao bạn chọn – từ áo CLB, đôi giày chạy, đến chiếc khăn cổ tay – không chỉ để vận động mà còn là cách bạn khẳng định niềm đam mê riêng với thể thao. Sporty Soul Friday nhắc chúng ta rằng: chuyển động không chỉ để khỏe, mà còn để lắng nghe cơ thể, nuôi dưỡng sự bền bỉ, tự tin và năng lượng tích cực. Mỗi bước chạy, cú bật cao hay vòng ném bóng đều là một nhịp sống riêng, giúp bạn khám phá ra một phiên bản tốt hơn của chính mình.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Mặc đồng phục/áo CLB thể thao hoặc mang phụ kiện thể thao yêu thích (bóng, giày, băng tay...)",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-04-10": {
    vi: {
      title: "Ngày Sức khoẻ và An toàn nghề nghiệp Thế giới",
      paragraphs: [
        "Hôm nay, bạn sẽ mặc trang phục của nghề nghiệp mơ ước – bác sĩ, giáo viên, đầu bếp, game designer… \n Không chỉ để vui, mà để nhìn thấy một phần của chính bạn trong tương lai. Bởi đôi khi, chỉ cần khoác lên mình “chiếc áo” ấy, bạn sẽ cảm nhận rõ hơn rằng ước mơ của mình là có thật. \n “Bạn của hôm nay là người đặt nền móng cho ước mơ ngày mai.” \n Connect Future Day không phải để biết chắc câu trả lời, mà là để bạn dám hình dung, dám ước mơ, và dám kết nối với phiên bản tương lai của chính mình. \n Bởi khi biết mình đang hướng đếu đâu, bạn cũng sẽ hiểu rõ hơn bạn đang là ai.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục theo ngành nghề mà bạn mong muốn theo đuổi sau này",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-04-24": {
    vi: {
      title: "Ngày sách Việt Nam (21/4)",
      paragraphs: [
      "Hôm nay, trang phục bạn chọn – một chiếc áo có slogan truyền cảm hứng, hay phụ kiện gợi nhớ đến nhân vật yêu thích – chính là cách bạn khoác lên mình sức mạnh của những trang sách. Bởi mỗi cuốn sách không chỉ để đọc, mà còn để kết nối: kết nối bạn với chính mình, với người khác, và với những thế giới chưa từng đặt chân tới. Pages that Connect Us Day là dịp để bạn lan tỏa câu chuyện chạm đến trái tim mình, trao đi cuốn sách bạn đã đọc tại Hội chợ đổi sách, và để hành trình ấy tiếp tục được viết nên qua tay người khác. Bởi cuốn sách bạn yêu thích hôm nay có thể chính là điều ai đó cần nghe nhất vào ngày mai.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục có slogan; HS mang theo cuốn sách mà mình yêu thích, in cài áo có biểu tượng liên quan đến sách",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: [],
  },
  "2026-04-29": {
    vi: {
      title: "We Day",
      paragraphs: [
        "Hôm nay, khi khoác lên mình chiếc áo đỏ sao vàng hay phụ kiện mang màu sắc quốc kỳ, bạn không chỉ mặc một màu áo – mà đang mang trong tim niềm tự hào dân tộc. Ngày 30/4 là mốc son lịch sử, nhắc chúng ta rằng: khi đoàn kết và tin tưởng vào nhau, dân tộc ta có thể làm nên điều tưởng chừng không thể. We Day là dịp để học sinh cùng nhau tưởng nhớ, tự hào, và nuôi dưỡng tinh thần gắn kết – để từ đó xây dựng một tương lai vững bền hơn. Bởi một dân tộc chỉ thật sự mạnh khi từng người trong đó hiểu và tự hào về gốc rễ của mình. Trong ngày này, bạn có thể lắng nghe và chia sẻ những câu chuyện gia đình về tinh thần dân tộc, để lịch sử không chỉ là quá khứ, mà còn là sợi dây kết nối thế hệ hôm nay với khát vọng và lòng dũng cảm của cha ông.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục cờ đỏ sao vàng",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: ["#FF7388"],
    dressImage: "/flag-vi.png",

  },
  "2026-05-15": {
    vi: {
      title: "Lighten Your Load Day",
      paragraphs: [
        "Màu xanh lá là sắc màu của sự tươi mới, cân bằng và phát triển. Trong Ngày “Mang tri thức, không mang gánh nặng”, màu xanh lá nhắc nhở chúng ta rằng việc học có thể nhẹ nhàng và đầy hứng khởi – giống như gieo một hạt mầm tri thức để nuôi dưỡng và cùng nhau lớn lên.",
      ],
    },
    en: { paragraphs: [] },
    dressCode: {
      en: "Trang phục màu xanh lá",
      vi: "Mặc theo tâm trạng hôm đó – có thể cài mood badge"
    },
    variant: "normal",
    dressColors: ["#2A820A"],
  },

} 