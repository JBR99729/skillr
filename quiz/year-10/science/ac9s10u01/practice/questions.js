"use strict";

const practiceQuestion = (id, section, question) => ({
  id: `ac9s10u01-p-${String(id).padStart(3, "0")}`,
  curriculumCode: "AC9S10U01",
  bank: "practice",
  section,
  printable: true,
  qualitySchema: "production-v1",
  ...question
});

const practiceQuestions = [
  practiceQuestion(1, "Purpose and products", {type:"single",question:"Which role best describes mitosis in a multicellular organism?",answers:["Making gametes","Increasing variation","Growing and replacing cells","Halving chromosome number"],correct:2,explanation:"Mitosis supplies genetically similar cells for growth, tissue repair and cell replacement."}),
  practiceQuestion(2, "Purpose and products", {type:"single",question:"Which cells are the usual products of meiosis in humans?",answers:["Body cells","Gametes","Identical skin cells","Stem cells"],correct:1,explanation:"Meiosis produces haploid gametes used in sexual reproduction."}),
  practiceQuestion(3, "Purpose and products", {type:"number",question:"How many daughter cells normally result from one parent cell completing mitosis?",correct:2,explanation:"One mitotic division normally produces two daughter cells."}),
  practiceQuestion(4, "Purpose and products", {type:"number",question:"How many haploid cells normally result when one parent cell completes meiosis?",correct:4,explanation:"Two meiotic divisions normally produce four haploid cells."}),
  practiceQuestion(5, "Purpose and products", {type:"single",question:"How do daughter cells made by mitosis usually compare genetically with the parent cell?",answers:["They have half its chromosomes","They are genetically similar to it","They are always sex cells","They contain unrelated DNA"],correct:1,explanation:"Accurate DNA replication and chromosome separation usually preserve the parent cell's genetic information."}),
  practiceQuestion(6, "Purpose and products", {type:"multiple",question:"Select both features that normally describe products of meiosis.",answers:["They are haploid","They are genetically varied","They are diploid clones","They are used only for tissue repair"],correct:[0,1],explanation:"Meiosis normally makes genetically varied haploid cells."}),
  practiceQuestion(7, "Chromosome number", {type:"number",question:"A human body cell has 46 chromosomes. How many chromosomes should each daughter cell have after mitosis?",correct:46,explanation:"Mitosis maintains the chromosome number, so each daughter cell remains diploid with 46 chromosomes."}),
  practiceQuestion(8, "Chromosome number", {type:"number",question:"How many chromosomes are present in a typical human sperm or egg cell?",correct:23,explanation:"Human gametes are haploid and contain 23 chromosomes."}),
  practiceQuestion(9, "Chromosome number", {type:"number",question:"A diploid parent cell contains 26 chromosomes. How many will each mitotic daughter cell contain?",correct:26,explanation:"Mitosis preserves the diploid chromosome number."}),
  practiceQuestion(10, "Chromosome number", {type:"number",question:"A diploid parent cell contains 26 chromosomes. How many chromosomes should each meiotic product contain?",correct:13,explanation:"Meiosis reduces the diploid number by half, from 26 to 13."}),
  practiceQuestion(11, "Ploidy", {type:"single",question:"What does the notation diploid (2n) indicate?",answers:["One chromosome set","Two chromosome sets","No chromosomes","Four chromosome sets"],correct:1,explanation:"A diploid cell has two sets of chromosomes, one set inherited from each parent."}),
  practiceQuestion(12, "Ploidy", {type:"single",question:"What does haploid (n) mean?",answers:["One chromosome set","Two nuclei","Twice the usual DNA","A cell made only by mitosis"],correct:0,explanation:"A haploid cell contains one complete set of chromosomes."}),
  practiceQuestion(13, "Gametes and fertilisation", {type:"multiple",question:"Select the two human gametes.",answers:["Sperm cell","Egg cell","Skin cell","Nerve cell"],correct:[0,1],explanation:"The human gametes are sperm and egg cells."}),
  practiceQuestion(14, "Gametes and fertilisation", {type:"single",question:"Why is meiosis essential to sexual reproduction?",answers:["It makes identical body cells","It produces varied haploid gametes","It doubles every chromosome","It repairs damaged tissue"],correct:1,explanation:"Meiosis produces genetically varied haploid gametes that can combine during fertilisation."}),
  practiceQuestion(15, "Comparing cell division", {type:"single",question:"Which comparison of chromosome number is correct?",answers:["Both processes halve it","Mitosis maintains it; meiosis halves it","Mitosis halves it; meiosis maintains it","Both processes double it"],correct:1,explanation:"Mitosis maintains chromosome number, whereas meiosis is a reduction division."}),
  practiceQuestion(16, "Chromosome number", {type:"single",question:"A diploid cell has 58 chromosomes. Which pair gives the chromosome number per product after mitosis and after meiosis?",answers:["29 and 58","58 and 29","58 and 58","116 and 58"],correct:1,explanation:"Mitosis maintains 58 chromosomes; meiosis halves the number to 29."}),
  practiceQuestion(17, "Chromosome number", {type:"single",question:"A diploid cell has 8 chromosomes. Which pair gives the chromosome number per product after mitosis and after meiosis?",answers:["8 and 4","4 and 8","8 and 8","16 and 4"],correct:0,explanation:"The mitotic products have 8 chromosomes and the meiotic products have 4."}),
  practiceQuestion(18, "Chromosome number", {type:"single",question:"A parent cell contains 12 homologous chromosome pairs. What is present after mitosis and meiosis?",answers:["12 pairs in each","12 pairs after mitosis; one chromosome from each pair after meiosis","6 pairs in each","24 pairs after mitosis; 12 pairs after meiosis"],correct:1,explanation:"Mitosis preserves all 12 pairs. A haploid meiotic product receives one chromosome from each homologous pair."}),
  practiceQuestion(19, "Gametes and fertilisation", {type:"single",question:"Why must gametes be haploid before fertilisation?",answers:["So the zygote receives no chromosomes","So two gametes restore the diploid number","So mitosis can halve the number later","So both gametes are genetically identical"],correct:1,explanation:"Combining two haploid gametes restores the species' diploid chromosome number."}),
  practiceQuestion(20, "Gametes and fertilisation", {type:"single",question:"What would happen across generations if both gametes were diploid and fertilisation still occurred?",answers:["Chromosome number would halve","Chromosome number would remain fixed","Chromosome number would double each generation","All offspring would be haploid"],correct:2,explanation:"Fusing two diploid gametes would double chromosome number at each generation."}),
  practiceQuestion(21, "Genetic variation", {type:"multiple",question:"Which meiotic events can create different allele combinations in gametes?",answers:["Crossing over","Independent assortment","Ordinary tissue repair","Cloning by mitosis"],correct:[0,1],explanation:"Crossing over and independent assortment both generate variation during meiosis."}),
  practiceQuestion(22, "Comparing cell division", {type:"single",question:"Why are mitotic daughter cells usually genetically similar?",answers:["DNA is copied before chromosomes are separated evenly","Their chromosome number is halved","Homologues cross over in every division","Two gametes fuse"],correct:0,explanation:"DNA replication followed by even chromosome separation gives each daughter cell the same genetic information in normal mitosis."}),
  practiceQuestion(23, "Comparing cell division", {type:"single",question:"How many nuclear divisions occur in mitosis compared with meiosis?",answers:["One in each","Two in mitosis and one in meiosis","One in mitosis and two in meiosis","Two in each"],correct:2,explanation:"Mitosis has one division; meiosis has meiosis I and meiosis II."}),
  practiceQuestion(24, "Gametes and fertilisation", {type:"order",question:"Arrange these events from a diploid germ cell to a new diploid zygote.",items:["Meiosis produces haploid gametes","A sperm and egg meet","The gamete nuclei fuse","A diploid zygote forms"],correct:[0,1,2,3],explanation:"Meiosis first makes haploid gametes; fertilisation then fuses two gamete nuclei and restores diploidy."})
];

const testQuestion = (id, section, question) => ({
  id: `ac9s10u01-t-${String(id).padStart(3, "0")}`,
  curriculumCode: "AC9S10U01",
  bank: "test",
  section,
  printable: true,
  qualitySchema: "production-v1",
  ...question
});

const testQuestions = [
  testQuestion(1, "Purpose and products", {type:"single",question:"Which cell-division process forms cells for sexual reproduction?",answers:["Mitosis","Meiosis","Cell growth","DNA replication alone"],correct:1,explanation:"Meiosis forms haploid gametes for sexual reproduction."}),
  testQuestion(2, "Purpose and products", {type:"single",question:"Which process normally produces genetically similar daughter cells?",answers:["Meiosis","Fertilisation","Mitosis","Mutation"],correct:2,explanation:"Mitosis normally produces daughter cells with genetic information matching the parent cell."}),
  testQuestion(3, "Chromosome number", {type:"number",question:"A species has 20 chromosomes in each body cell. How many chromosomes should each gamete contain?",correct:10,explanation:"Gametes are haploid, so meiosis reduces 20 chromosomes to 10."}),
  testQuestion(4, "Ploidy", {type:"single",question:"Which human cell is normally diploid?",answers:["Egg cell","Sperm cell","Skin cell","Any gamete"],correct:2,explanation:"A skin cell is a diploid body cell; sperm and egg cells are haploid gametes."}),
  testQuestion(5, "Chromosome number", {type:"single",question:"Which process reduces the chromosome number from 2n to n?",answers:["Mitosis","Meiosis","Growth","Tissue repair"],correct:1,explanation:"Meiosis is the reduction division that produces haploid cells."}),
  testQuestion(6, "Purpose and products", {type:"fill-blank",question:"Complete the statement about mitosis.",template:"Mitosis normally produces {{blank}} genetically similar daughter cells.",acceptedAnswers:["two","2"],explanation:"One mitotic division normally produces two daughter cells."}),
  testQuestion(7, "Purpose and products", {type:"fill-blank",question:"Complete the statement about meiosis.",template:"Meiosis normally produces {{blank}} genetically varied haploid cells.",acceptedAnswers:["four","4"],explanation:"Two meiotic divisions normally produce four haploid products."}),
  testQuestion(8, "Ploidy", {type:"multiple",question:"Select both correct descriptions of human cells.",answers:["Body cells are usually diploid (2n)","Gametes are haploid (n)","Body cells are usually haploid (n)","Gametes are diploid (2n)"],correct:[0,1],explanation:"Most human body cells are diploid, while sperm and egg cells are haploid."}),
  testQuestion(9, "Gametes and fertilisation", {type:"multiple",question:"Select both correct human gamete descriptions.",answers:["Sperm is the male gamete","Egg is the female gamete","Skin cell is the male gamete","Nerve cell is the female gamete"],correct:[0,1],explanation:"The male gamete is the sperm and the female gamete is the egg."}),
  testQuestion(10, "Gametes and fertilisation", {type:"fill-blank",question:"Name the process described.",template:"The fusion of sperm and egg is called {{blank}}.",acceptedAnswers:["fertilisation","fertilization"],explanation:"Fertilisation is the fusion of haploid gametes to form a diploid zygote."}),
  testQuestion(11, "Comparing cell division", {type:"true-false",question:"Mitosis contributes to tissue growth and repair.",answers:["True","False"],correct:0,explanation:"True. Mitosis supplies replacement cells for growth and repair."}),
  testQuestion(12, "Genetic variation", {type:"true-false",question:"The four cells produced by meiosis are normally genetically identical.",answers:["True","False"],correct:1,explanation:"False. Crossing over and independent assortment help make meiotic products genetically varied."}),
  testQuestion(13, "Ploidy", {type:"true-false",question:"A haploid cell has one chromosome set, half the number in a diploid cell of the same species.",answers:["True","False"],correct:0,explanation:"True. Haploid is n and diploid is 2n."}),
  testQuestion(14, "Chromosome number", {type:"true-false",question:"Mitosis of a diploid cell with 40 chromosomes normally produces daughter cells with 20 chromosomes each.",answers:["True","False"],correct:1,explanation:"False. Mitosis maintains chromosome number, so each daughter cell should have 40 chromosomes."}),
  testQuestion(15, "Genetic variation", {type:"true-false",question:"Meiosis can increase genetic variation among gametes.",answers:["True","False"],correct:0,explanation:"True. Crossing over and independent assortment create different allele combinations."}),
  testQuestion(16, "Gametes and fertilisation", {type:"true-false",question:"Fertilisation restores the diploid chromosome number when two normal haploid gametes fuse.",answers:["True","False"],correct:0,explanation:"True. The two haploid chromosome sets combine in the diploid zygote."})
];

const isTestSet = window.quizConfig?.storageKey === "AC9S10U01TestBest";
window.quizQuestions = isTestSet ? testQuestions : practiceQuestions;
