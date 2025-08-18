export type TopicVariant = "normal" | "special"

export interface LocalizedContent {
  quote?: string
  paragraphs?: string[]
  bullets?: Array<{ text: string; subBullets?: string[] }>
  outro?: string
}

export interface MonthI18n {
  vi: LocalizedContent
  en: LocalizedContent
  variant?: TopicVariant
  photoSrc?: string
  dressColors?: string[]
  disabled?: boolean
}

// I18n content keyed by month id (e.g. "2025-08-15")
export const topicsI18n: Record<string, MonthI18n> = {
  "2025-08-15": {
    vi: {
      quote: "Mỗi cảm xúc đều có giá trị. Mỗi sắc màu là một phần của bạn.",
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
    variant: "normal",
    dressColors: ["#FFD54F", "#0F2A44", "#E53935", "#E0E0E0", "#4A2E83"],
  },
  "2025-08-29": {
    vi: {
      quote: "Bắt đầu bằng sự hiện diện – Trưởng thành bằng sự kết nối",
      paragraphs: [
        "Ngày Quốc khánh 2/9 không chỉ là dấu mốc lịch sử của đất nước, mà còn là dịp để mỗi chúng ta nhìn lại, biết ơn và tự hào khi được sinh ra, lớn lên trên mảnh đất hình chữ S – nơi hội tụ truyền thống kiên cường, lòng nhân ái và khát vọng vươn lên. Trong tinh thần ấy, We Day – Tự hào Việt Nam là dịp để WISers gửi lời tri ân đến thế hệ đi trước đã dựng xây hòa bình; khẳng định niềm tin vào một thế hệ mới tự chủ, bản lĩnh, giàu lòng nhân văn; và lan tỏa tình yêu đất nước qua những hình ảnh thân thuộc: sắc đỏ sao vàng, tà áo dài, trang phục truyền thống, hình ảnh anh bộ đội, hay chính đồng phục Wellspring. Trong trái tim mỗi WISer hôm nay, tình yêu Việt Nam không chỉ là một cảm xúc, mà còn là động lực để học tập, sáng tạo và sống có trách nhiệm hơn mỗi ngày – trở thành chiếc cầu nối giữa quá khứ, hiện tại và tương lai.",
      ],
    },
    en: { paragraphs: [] },
    variant: "special",
    dressColors: ["#EB1D27", "#FFCC00"],
  },
  "2025-09-12": {
    vi: {
      quote: "Tự hào Việt Nam",
      paragraphs: [
        "Trang phục trắng trong Tune-in Day là gam màu của sự khởi đầu cởi mở, không phán xét, để mỗi WISer bắt đầu hành trình mới với trái tim rộng mở và tâm trí an lành Đây là lời nhắc để mỗi WISer mở lòng, lắng nghe chính mình và kết nối với người khác một cách tự nhiên nhất.",
      ],
    },
    en: { paragraphs: [] },
    variant: "normal",
    dressColors: ["#ffffff"],
  },
  "2025-09-26": {
    vi: {
      quote: "Tự hào Việt Nam",
      paragraphs: [
        "Trang phục đỏ, vàng rực rỡ hay những bộ trang phục truyền thống Việt Nam chính là cách Wellspring lan tỏa niềm vui, niềm tự hào và tinh thần cộng đồng trong dịp Trung thu – bên cạnh đèn lồng, múa lân hay bánh nướng, tất cả góp phần gắn kết, sẻ chia và lưu giữ yêu thương.",
      ],
    },
    en: { paragraphs: [] },
    variant: "normal",
    dressColors: ["#EB1D27", "#FFCC00"],
  },
}


