export type FinancialDocument = {
  label: string;
  href: string;
};

export type FinancialDocumentGroup = {
  title: string;
  titleSerif: string;
  documents: FinancialDocument[];
};

export const financialDocumentGroups: FinancialDocumentGroup[] = [
  {
    title: "Información Financiera",
    titleSerif: "Trimestral",
    documents: [
      { label: "Junio 2024", href: "https://drive.google.com/file/d/1VAU2KhVS1XmYW0lHW1iDnZaXvzDaLIiz/view?usp=sharing" },
      { label: "Septiembre 2024", href: "https://drive.google.com/file/d/1D9MxGBwXqZREDHk7pOBK9Ppn0bNB8VT9/view?usp=sharing" },
      { label: "Diciembre 2024", href: "https://drive.google.com/file/d/1U3yxI345CNCcKZBBud3qD4pmLK0JPzSi/view?usp=sharing" },
      { label: "Marzo 2025", href: "https://drive.google.com/file/d/1FHfdglUuaeVzLB3IynMqrPdMKRyNHnzn/view?usp=sharing" },
      { label: "Junio 2025", href: "https://drive.google.com/file/d/1Jf6SfpdYHM0QOj7qKxN9bOi-y7A0ttPy/view?usp=sharing" },
      { label: "Septiembre 2025", href: "https://drive.google.com/file/d/1wBmnqMxUmrCcjFFVnTlx0Nyp4a_Q91aA/view?usp=sharing" },
      { label: "Diciembre 2025", href: "https://drive.google.com/file/d/174N69bSL5KEilHOOaRldCYaG19vH6w7v/view?usp=sharing" },
      { label: "Marzo 2026", href: "https://drive.google.com/file/d/14uRGtyaqcvanBk-bq8UP9aZgfsywgsSd/view?usp=sharing" },
      { label: "Junio 2026", href: "https://drive.google.com/file/d/1R2HLwxB60MkKUhae5Y4v1_YWn4W-wnrn/view?usp=sharing" },
    ],
  },
  {
    title: "Información Financiera",
    titleSerif: "Anual",
    documents: [
      { label: "31 de diciembre de 2020 y 2021", href: "https://drive.google.com/file/d/1KGoQ96_L49Pu9clUfXaFTS-asCPmygst/view?usp=drive_link" },
      { label: "31 de diciembre de 2022 y 2023", href: "https://drive.google.com/file/d/11MdN0K5voiXsy0VqS1m7fsP-pf1aNaFB/view?usp=drive_link" },
      { label: "31 de diciembre de 2023 y 2024", href: "https://drive.google.com/file/d/1oIX8eajBHpwcn53ZPsTKot0MBcOGp-ag/view?usp=drive_link" },
      { label: "31 de diciembre de 2024 y 2025", href: "https://drive.google.com/file/d/1e6ZSAK3Rm4UO4FGntJF4dU0aNH-EcMmA/view?usp=sharing" },
    ],
  },
  {
    title: "Razones",
    titleSerif: "Financieras",
    documents: [
      { label: "Marzo 2024", href: "https://drive.google.com/file/d/12H5T3zdv2EwAyPEPirZRWu1Nhwjt6f8X/view?usp=drive_link" },
      { label: "Junio 2024", href: "https://drive.google.com/file/d/17--3csNr-FzN4Jk_vzjl5xmStSjannI5/view?usp=sharing" },
      { label: "Septiembre 2024", href: "https://drive.google.com/file/d/1OumYBlcQEK2RQmjDHpNotXjTWCgp5scO/view?usp=sharing" },
      { label: "Diciembre 2024", href: "https://drive.google.com/file/d/15REfpsSeGY31DW5omudR7P3IzzawUqmX/view?usp=sharing" },
      { label: "Junio 2025", href: "https://drive.google.com/file/d/1u12N_l07FqMjAGjOQvXllg_eyjViykfT/view?usp=sharing" },
      { label: "Septiembre 2025", href: "https://drive.google.com/file/d/1HRrrz_9G7btM_VgdLhiumeSOuiAUpKZw/view?usp=sharing" },
      { label: "Diciembre 2025", href: "https://drive.google.com/file/d/1TzxJpKC6na4Wu9MWi_GdLzOSYoI6czGX/view?usp=sharing" },
      { label: "Marzo 2026", href: "https://drive.google.com/file/d/1pwQRAW_H94kMbVQ5b2VkkKfCzaKCfHJ8/view?usp=sharing" },
      { label: "Junio 2026", href: "https://drive.google.com/file/d/1POdbx3FQO_UdFPFSmAX572cF-RhH68lW/view?usp=sharing" },
    ],
  },
];
