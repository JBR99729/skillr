const p=(title,subtitle,strand,component,labels,progression,worked,misconceptions,warmUp,mustTeach,mustNot,assignment)=>({title,subtitle,strand,component,labels,progression,worked,misconceptions,warmUp,mustTeach,mustNot,...(assignment?{assignment}:{})});

export const profiles={
  AC9S8U02:p(
    "From Cells to Organ Systems",
    "Specialised cells form tissues and organs whose structures enable a whole system to keep an organism alive.",
    "Biological sciences","system",
    ["specialised cell","tissue","organ","organ system","survival"],
    ["Locate the levels","Link structure to function","Trace the system","Test a disruption"],
    ["Alveoli have thin walls and a large surface area.","These structures shorten diffusion distance and increase gas exchange.","Damaged alveoli reduce oxygen transfer and affect the whole respiratory system."],
    [["An organ works alone.","Trace its inputs, outputs and links to other organs."],["All cells in an organ are the same.","Compare specialised cell types and the jobs they perform."]],
    ["Give groups cards labelled cell, tissue, organ and system.","Order them, then add one function and one dependency to each card."],
    ["Biological organisation proceeds from specialised cells to tissues, organs and systems.","Structure at each level supports function.","A change at one level can affect survival of the whole organism."],
    ["Do not reduce every organ system to a simple machine analogy.","Do not teach detailed senior physiology or biochemical pathways as the target."]
  ),
  AC9S8U03:p(
    "Plate Boundaries Shape Earth",
    "Plate movement produces different geological features, and multiple evidence lines support plate tectonic theory.",
    "Earth and space sciences","plate",
    ["divergent","convergent","transform","earthquake and volcano pattern","evidence"],
    ["Map the pattern","Model each boundary","Connect motion to features","Build the evidence case"],
    ["At a convergent boundary, plates move together.","Subduction can produce a trench, earthquakes and a volcanic arc.","The linked pattern is explained by plate motion, not by isolated events."],
    [["Earthquakes occur randomly.","Overlay earthquake and volcano locations with plate boundaries."],["Convection alone pushes every plate.","Compare ridge push, slab pull and mantle movement without claiming one universal cause."]],
    ["Use two cards as plates and move them apart, together and past each other.","For each motion, predict one landform or hazard before revealing the model."],
    ["Divergent, convergent and transform boundaries have distinct relative motions and features.","Spatial and historical evidence supports plate tectonic theory.","Tectonic activity affects people and can be mitigated through engineering and warning systems."],
    ["Do not show plates floating on liquid magma.","Do not treat continental drift and plate tectonics as identical theories."]
  ),
  AC9S8U04:p(
    "Rocks Record Their Formation",
    "Rock properties reflect processes in the rock cycle, which operate over very different timescales.",
    "Earth and space sciences","cycle",
    ["igneous","sedimentary","metamorphic","weathering and melting","time and properties"],
    ["Observe properties","Infer formation","Trace transformations","Connect properties to use"],
    ["Sandstone contains visible grains in layers.","Deposition, compaction and cementation explain this texture.","Its layered, porous structure influences where it is useful and how it weathers."],
    [["Every rock follows one fixed circular path.","Trace several possible routes through the network."],["All rock-cycle changes take the same time.","Contrast rapid eruption and cooling with slow burial and metamorphism."]],
    ["Display three unlabelled rock samples or photographs.","Students record texture, grain and layering before inferring a formation process."],
    ["Igneous, sedimentary and metamorphic rocks form through different processes.","Observable properties provide evidence of formation.","Rock-cycle processes span short events to geological timescales and influence uses."],
    ["Do not present the rock cycle as a one-way loop.","Do not identify rocks from colour alone."]
  ),
  AC9S8U05:p(
    "Track Energy Through a System",
    "Energy can be classified as kinetic or potential and tracked as it transfers and transforms.",
    "Physical sciences","energy",
    ["energy store","kinetic","potential","transfer","transformation and heating"],
    ["Define the system","Classify energy","Trace transfers","Account for heating"],
    ["A raised cart has gravitational potential energy.","As it rolls down, energy transforms mainly to kinetic energy.","Some energy transfers to the surroundings by heating and sound; it is not lost."],
    [["Energy is used up.","Track it into less useful heating and sound outputs."],["Electricity is stored inside wires.","Describe electrical energy transfer through a circuit, then the output transformation."]],
    ["Give students an energy chain for a torch with one blank stage.","Complete battery chemical store → electrical transfer → light and heating."],
    ["Kinetic energy involves movement; potential energy is associated with position or condition.","Energy transfers between objects and transforms between forms.","Heating is often a by-product and energy is conserved."],
    ["Do not introduce advanced energy equations as the lesson target.","Do not use arrows that imply energy disappears."]
  ),
  AC9S8U06:p(
    "Classify Matter with Particle Models",
    "Particle types and arrangements distinguish elements, compounds and mixtures; symbols and formulas communicate composition.",
    "Chemical sciences","particle",
    ["element","compound","mixture","particle model","symbol and formula"],
    ["Read the particles","Classify the sample","Translate representations","Evaluate the model"],
    ["A box contains identical particles, each made from one black and two white atoms.","Because every particle has two atom types chemically joined, it is a pure compound.","The formula records ratio, while a particle model shows arrangement."],
    [["A compound is any sample with several atom types.","Check whether different atoms are chemically joined in identical particles."],["A formula is a picture of shape.","Separate composition and ratio from three-dimensional geometry."]],
    ["Show three particle boxes: one atom type, identical joined particles, and two unjoined particle types.","Students classify and justify using particle evidence."],
    ["Elements contain one type of atom; compounds contain chemically joined atom types in fixed ratios; mixtures contain substances together without chemical bonding.","Representations show different information and have limitations.","Symbols and formulas communicate composition efficiently."],
    ["Do not imply particles in diagrams are shown at true scale.","Do not teach bonding theory or electron configurations as the target."]
  ),
  AC9S8U07:p(
    "Has a New Substance Formed?",
    "Evidence distinguishes physical change from chemical change, including observed energy changes.",
    "Chemical sciences","compare",
    ["physical change","chemical change","new substance evidence","temperature change","test and inference"],
    ["Observe before and after","Identify evidence","Classify the change","Justify the inference"],
    ["Vinegar and bicarbonate produce bubbles and a temperature change.","Gas production and changed properties support formation of new substances.","One observation alone is not always conclusive, so combine evidence."],
    [["Any colour change proves a reaction.","Ask whether mixing, dissolving or lighting could explain the colour."],["Melting is chemical because it needs energy.","Check whether the substance identity changes, not whether energy transfers."]],
    ["Sort six change cards into physical, chemical or insufficient evidence.","Require one observable reason for every placement."],
    ["Physical changes do not create a new substance; chemical changes rearrange particles into new substances.","Indicators include gas, precipitate, persistent colour or temperature change.","Energy evidence must be interpreted with other observations."],
    ["Do not claim every bubble, colour change or temperature change proves a reaction.","Do not introduce full reaction-rate or equilibrium theory."]
  ),
  AC9S9U01:p(
    "Control Systems Keep the Body Stable",
    "Nervous and endocrine pathways coordinate responses, while negative feedback restores a variable toward its set range.",
    "Biological sciences","feedback",
    ["stimulus","receptor and coordinator","effector","response","negative feedback"],
    ["Detect change","Send information","Coordinate response","Restore the range"],
    ["Body temperature rises above its normal range.","Receptors signal a coordinating centre; sweating and skin blood-flow responses increase heat loss.","As temperature returns toward range, the corrective response reduces."],
    [["Negative feedback makes a response worse.","Trace how the response opposes the original change."],["The nervous and endocrine systems act independently.","Compare their signals and show how both coordinate body responses."]],
    ["Give students a scrambled temperature-regulation loop.","Arrange stimulus → receptor → coordinator → effector → response and draw the return arrow."],
    ["Body systems detect stimuli and coordinate responses.","Nervous and endocrine systems differ in signal, speed and duration.","Negative feedback counteracts change to maintain a stable internal range."],
    ["Do not describe homeostasis as an unchanging exact value.","Do not teach detailed hormone pathways beyond the selected feedback examples."]
  ),
  AC9S9U02:p(
    "Reproduction and Species Survival",
    "Reproductive structures support sexual or asexual reproduction, creating different patterns of variation and population growth.",
    "Biological sciences","compare",
    ["gametes and organs","fertilisation","sexual reproduction","asexual reproduction","variation and survival"],
    ["Identify structures","Trace each process","Compare offspring","Connect variation to survival"],
    ["Strawberry runners produce genetically similar plants without gamete fusion.","Flowering plants use pollen and ovules in sexual reproduction.","Asexual reproduction can expand quickly; sexual reproduction increases variation."],
    [["Sexual reproduction always means mating.","Define it by fusion of gametes in plants and animals."],["Asexual offspring are always perfectly identical.","Use ‘genetically very similar’ and acknowledge mutation and environment."]],
    ["Sort examples—runners, binary fission, seeds and external fertilisation—by process.","Add one benefit and one limitation for species survival."],
    ["Reproductive cells and organs have structures suited to their functions.","Sexual reproduction involves gamete fusion and usually increases genetic variation.","Asexual reproduction uses one parent and can rapidly increase numbers."],
    ["Do not turn this lesson into detailed human sexuality or embryology.","Do not claim one reproductive strategy is universally better."]
  ),
  AC9S9U03:p(
    "Carbon Moves Through Earth’s Spheres",
    "Carbon is stored and transferred among the atmosphere, biosphere, hydrosphere and geosphere by linked processes.",
    "Earth and space sciences","carbon",
    ["atmosphere","biosphere","hydrosphere","geosphere","photosynthesis, respiration and combustion"],
    ["Locate carbon stores","Name transfer processes","Trace a carbon atom","Test a disturbance"],
    ["Atmospheric carbon dioxide enters a plant by photosynthesis.","Feeding transfers carbon through the biosphere; respiration can return it to the atmosphere.","Burial stores some carbon in the geosphere, while combustion releases it rapidly."],
    [["Carbon is created by combustion.","Track existing carbon atoms from fuel to carbon dioxide."],["The carbon cycle is one simple circle.","Use a network with multiple stores and pathways operating at different rates."]],
    ["Students trace one labelled carbon token through at least three spheres.","Every arrow must be named with a process, not only a direction."],
    ["Carbon exists in major stores across four Earth spheres.","Photosynthesis, respiration, decomposition, dissolution and combustion transfer carbon.","Changing one transfer rate can alter multiple stores."],
    ["Do not imply every carbon pathway operates at the same speed.","Do not confuse matter cycling with energy flow."]
  ),
  AC9S9U04:p(
    "Two Models for Energy Transfer",
    "Wave and particle models explain different aspects of energy transfer through matter and space.",
    "Physical sciences","wave",
    ["wave","amplitude and frequency","particle vibration","medium","model strength and limit"],
    ["Observe the phenomenon","Apply a wave model","Apply a particle model","Judge usefulness"],
    ["Sound travels through air as a disturbance.","A wave model describes frequency, amplitude and direction of transfer.","A particle model explains collisions and vibration in the medium; particles do not travel from source to listener."],
    [["Particles travel with the wave from source to receiver.","Track one particle oscillating around a fixed position."],["One model must be the true picture.","Identify which question each model answers and where it stops being useful."]],
    ["Use a row of students as particles passing a pulse without changing places.","Compare what the demonstration shows with a drawn transverse wave."],
    ["Waves transfer energy without net transfer of matter.","Particle interactions explain transfer through a medium.","Models are evaluated by what they explain and what they omit."],
    ["Do not use a transverse sketch to claim sound particles move up and down.","Do not introduce senior wave equations as the central target."]
  ),
  AC9S9U05:p(
    "Conservation and System Efficiency",
    "Energy input equals total output; efficiency compares useful output with total input.",
    "Physical sciences","efficiency",
    ["system boundary","input","useful output","dissipated output","efficiency"],
    ["Define the system","Account for outputs","Calculate efficiency","Improve the design"],
    ["A motor receives 200 J and delivers 140 J of useful motion.","The remaining 60 J transfers mainly as heating and sound.","Efficiency = 140 ÷ 200 × 100% = 70%."],
    [["Inefficient systems destroy energy.","Complete the energy account including dissipated outputs."],["Efficiency can exceed 100%.","Check that useful output cannot be greater than total input for the same boundary and interval."]],
    ["Give groups input and output cards for a device.","Balance the energy account, calculate efficiency and suggest one realistic improvement."],
    ["Energy is conserved across a defined system.","Useful and dissipated outputs together equal input.","Efficiency is useful output divided by total input, expressed as a percentage."],
    ["Do not confuse energy efficiency with speed or power.","Do not omit the system boundary or mix energy and power values."]
  ),
  AC9S9U06:p(
    "How Atomic Models Changed",
    "New evidence changed atomic models, and unstable nuclei can decay toward more stable arrangements.",
    "Chemical sciences","atom",
    ["Dalton","electron","nucleus","proton and neutron","radioactive decay"],
    ["Start with each model","Add the new evidence","Revise the structure","Connect instability to decay"],
    ["Rutherford’s scattering results showed most particles passed through foil while a few deflected strongly.","A diffuse positive sphere could not explain those rare large deflections.","A tiny, dense, positive nucleus produced a better explanatory model."],
    [["Scientists simply guessed newer models.","Match each revision to the evidence it explained."],["Radioactive atoms choose to decay at a predictable time.","Distinguish random individual decay from predictable behaviour of a large sample."]],
    ["Match evidence cards to Dalton, Thomson, Rutherford and nuclear models.","Students state what each new model explained better."],
    ["Scientific atomic models changed when evidence could not be explained by an older model.","Atoms contain electrons and a nucleus with protons and neutrons.","Natural radioactive decay changes unstable nuclei toward more stable forms."],
    ["Do not teach quantum orbitals as the target model.","Do not imply electron-shell diagrams show literal paths."]
  ),
  AC9S9U07:p(
    "Atoms Rearrange in Reactions",
    "Chemical equations represent the same atoms rearranged into new substances, conserving mass in a closed system.",
    "Chemical sciences","reaction",
    ["reactant particles","product particles","word equation","balanced equation","conservation of mass"],
    ["Name reactants and products","Model particle rearrangement","Count each atom","Balance the representation"],
    ["Hydrogen reacts with oxygen to form water.","The particle model 2H₂ + O₂ → 2H₂O has four H atoms and two O atoms on each side.","Coefficients change particle numbers; subscripts must not be changed to balance an equation."],
    [["Balancing creates extra atoms.","Inventory atoms before and after and only adjust coefficients."],["Mass decreases when a gas escapes.","Define the system boundary and distinguish measured open-system mass from total mass."]],
    ["Give students coloured counters for two reactants.","Rearrange them into products without adding, removing or changing any counter."],
    ["Atoms are rearranged, not created or destroyed, in chemical reactions.","Word, particle and balanced symbolic equations represent the same event.","Mass is conserved when the whole system is considered."],
    ["Do not change chemical formulas to make an equation balance.","Do not introduce mole calculations or redox formalism as the target."]
  ),
  AC9S10U01:p(
    "Genes, Cell Division and Inheritance",
    "DNA, genes and chromosomes carry hereditary information; meiosis and fertilisation generate inheritance patterns and variation.",
    "Biological sciences","genetics",
    ["DNA and gene","chromosome","mitosis","meiosis and fertilisation","Mendelian prediction"],
    ["Nest the genetic structures","Compare cell divisions","Track alleles","Predict offspring"],
    ["Two heterozygous parents are represented as Aa × Aa.","A Punnett model predicts AA, Aa, Aa and aa genotypes.","The expected phenotype ratio is 3 dominant : 1 recessive across many offspring, not a guaranteed order in four births."],
    [["A gene and a chromosome are the same object.","Nest gene as a DNA segment located on a chromosome."],["A Punnett square predicts exact family outcomes.","Describe probabilities and expected ratios over many independent events."]],
    ["Build a chromosome–DNA–gene nesting model, then complete one monohybrid cross.","Students explain where each allele in an offspring came from."],
    ["Genes are DNA sequences located on chromosomes.","Mitosis supports growth and repair; meiosis produces genetically varied gametes.","Mendelian models predict genotype and phenotype probabilities."],
    ["Do not imply one gene determines every characteristic.","Do not extend to complex linkage or molecular gene regulation as the target."],
    {
      heading:"Assignment: Students to finish the following take-home task",
      introduction:"Year 10 Science AC9S10U01 take-home questions on meiosis, genetic variation, fertilisation, chromosomes and Mendelian inheritance.",
      introPrompt:"How do meiosis and fertilisation explain the allele combinations shown in this Mendelian cross?",
      extendedResponse:[
        {placement:"E2",prompt:"Explain how the independent orientation of homologous chromosome pairs during meiosis creates different chromosome combinations in gametes.",expectedAnswer:"Each homologous pair lines up independently at metaphase I, so maternal and paternal homologues can enter gametes in many combinations. For n chromosome pairs, independent assortment can produce 2^n combinations before crossing over is considered.",acceptableEvidence:"Links independent metaphase I orientation to new maternal and paternal chromosome combinations in haploid gametes.",likelyError:"Describes crossing over instead of independent assortment.",remediation:"Use two chromosome pairs and list the four possible maternal and paternal combinations."},
        {placement:"E2",prompt:"Describe why the chance-based separation of homologous chromosomes results in genetically varied gametes.",expectedAnswer:"At anaphase I, one homologue from each pair moves to each pole. Because pair orientation was independent, the particular maternal or paternal homologue received by a gamete varies by chance.",acceptableEvidence:"Connects separation of homologues with a different allele combination in each resulting gamete.",likelyError:"States that sister chromatids separate during anaphase I.",remediation:"Revisit the two divisions: homologous chromosomes separate in meiosis I; sister chromatids separate in meiosis II."},
        {placement:"E2",prompt:"Explain why meiosis must reduce the chromosome number so that its daughter cells are haploid.",expectedAnswer:"Haploid gametes contain one chromosome from each homologous pair. When two gametes fuse, the diploid number is restored rather than doubled in every generation.",acceptableEvidence:"Uses n + n = 2n and connects chromosome reduction with chromosome-number stability after fertilisation.",likelyError:"Claims haploid cells contain no chromosome pairs because they contain half of each chromosome.",remediation:"Show that a haploid gamete has one complete chromosome from each homologous pair, not half a chromosome."},
        {placement:"E2",prompt:"Explain how the chance union of an egg and sperm increases the possible genetic variation among offspring.",expectedAnswer:"Each egg and sperm carries a potentially unique haploid allele combination. Random fertilisation combines any one of many genetically distinct sperm with any one of many genetically distinct eggs, multiplying the number of possible zygote genotypes.",acceptableEvidence:"Links two independently varied haploid gametes to a new diploid allele combination in the zygote.",likelyError:"Suggests fertilisation causes crossing over or deliberately creates mutations.",remediation:"Separate sources of gamete variation during meiosis from the random pairing of gametes at fertilisation."}
      ],
      multipleChoice:[
        {placement:"E2",prompt:"At metaphase I, each homologous chromosome pair can face either pole independently of the other pairs. What is the main genetic outcome?",options:["Offspring receive the same paternal gene combination every time.","Gametes receive varied mixtures of maternal and paternal chromosomes.","The chromosome number doubles before the gametes form.","DNA replication errors are prevented."],answerIndex:1,explanation:"Independent assortment produces many possible maternal and paternal chromosome combinations in gametes."},
        {placement:"E2",prompt:"Which event best explains random segregation during the first meiotic division?",options:["Non-sister chromatids exchange DNA where chiasmata form.","The homologues in each pair move to opposite cells, with either homologue able to enter either cell.","Sister chromatids move apart in a fixed and identical sequence.","DNA polymerase repairs random mismatches in body cells."],answerIndex:1,explanation:"Homologous chromosomes separate in anaphase I, and their earlier random orientation determines which homologue reaches each cell."},
        {placement:"E2",prompt:"A human germ cell does not complete reduction division. If its abnormal gamete fuses with a normal gamete, which result is expected?",options:["A 23-chromosome gamete forms a normal 46-chromosome zygote.","A 46-chromosome gamete combines with a 23-chromosome gamete to form a 69-chromosome zygote.","An 11.5-chromosome gamete forms an incomplete zygote.","The gamete necessarily lacks a membrane and immediately dies."],answerIndex:1,explanation:"Failure of reduction can leave a diploid gamete; fusion with a normal haploid gamete would produce a triploid zygote."},
        {placement:"E2",prompt:"Why does random fertilisation add to genetic diversity in a sexually reproducing population?",options:["Contact between gametes deliberately creates point mutations.","Maternal and paternal chromosomes cross over after the gametes meet.","One genetically distinct sperm can unite with one genetically distinct egg from a very large set of possible pairings.","Gamete release changes gene expression in both parents."],answerIndex:2,explanation:"Random fertilisation combines two independently produced haploid allele sets, greatly increasing possible zygote genotypes."},
        {placement:"central",prompt:"Process X produces two genetically similar daughter cells for growth and repair. Process Y produces four genetically varied cells for reproduction. Which identification is correct?",options:["X is meiosis and Y is mitosis.","X is mitosis and Y is meiosis.","X is fertilisation and Y is mitosis.","X is binary fission and Y is mitosis."],answerIndex:1,explanation:"Mitosis usually preserves chromosome number and genetic information; meiosis produces varied haploid gametes."},
        {placement:"E2",prompt:"When does crossing over occur, and what does it produce?",options:["During metaphase II, producing identical sister chromatids.","During prophase I, producing recombinant chromatids with new allele combinations.","During anaphase I, producing the reduction from diploid to haploid.","During telophase II, producing four separate cytoplasms."],answerIndex:1,explanation:"Homologous chromosomes pair in prophase I, allowing non-sister chromatids to exchange corresponding DNA segments at chiasmata."},
        {placement:"worked",prompt:"For a single-gene trait with complete dominance, what phenotype ratio is expected from Aa × Aa across many offspring?",options:["All offspring show the dominant phenotype.","One dominant phenotype for every one recessive phenotype.","Three dominant phenotypes for every one recessive phenotype.","One dominant phenotype for every three recessive phenotypes."],answerIndex:2,explanation:"The genotypes AA, Aa, Aa and aa give an expected 3:1 dominant-to-recessive phenotype ratio."},
        {placement:"E2",prompt:"Why is chromosome-number reduction in meiosis necessary across generations?",options:["It allows fertilisation to restore the species' diploid chromosome number instead of doubling it each generation.","It lowers the energy cost of every later cell division.","It makes DNA replicate twice as quickly before mitosis.","It stops dominant alleles becoming more common than recessive alleles."],answerIndex:0,explanation:"Producing haploid gametes means fertilisation restores the diploid number and supports chromosome-number stability across generations."}
      ]
    }
  ),
  AC9S10U02:p(
    "Natural Selection Explains Diversity",
    "Heritable variation, selection pressure and differential reproduction change populations over generations.",
    "Biological sciences","evolution",
    ["heritable variation","selection pressure","survival and reproduction","population change","multiple evidence lines"],
    ["Identify variation","Apply selection pressure","Track reproduction","Evaluate evidence"],
    ["A bacterial population varies in antibiotic resistance.","Antibiotic exposure does not create the needed mutation; resistant variants survive and reproduce more.","The frequency of resistance increases across generations."],
    [["Individuals evolve because they need to.","Track changes in trait frequency across a reproducing population."],["Natural selection is random.","Separate random sources of variation from non-random survival and reproduction under a selection pressure."]],
    ["Use a coloured-token population and remove tokens according to one environmental rule.","Reproduce survivors and graph trait frequency over three generations."],
    ["Populations contain heritable variation.","Selection pressures affect survival and reproductive success.","Fossils, anatomy, biogeography and molecular evidence support evolutionary theory."],
    ["Do not describe evolution as progress toward perfection.","Do not claim organisms change traits deliberately in response to need."]
  ),
  AC9S10U03:p(
    "Evidence for an Expanding Universe",
    "The Big Bang model explains an evolving universe and is supported by converging astronomical evidence.",
    "Earth and space sciences","universe",
    ["early hot dense universe","expansion","galaxy and star formation","redshift","cosmic microwave background"],
    ["Establish scale and time","Model expansion","Examine evidence","Evaluate the theory"],
    ["Light from many distant galaxies is redshifted.","Greater distance is associated with greater recession speed in Hubble’s observations.","This pattern supports expansion of space; it is not galaxies exploding from one central point into empty space."],
    [["The Big Bang was an explosion at one location.","Use an expanding-space model with no privileged centre on the surface."],["A scientific theory is an untested guess.","Link the model to redshift, background radiation and element-abundance evidence."]],
    ["Mark points on an elastic strip and stretch it evenly.","Measure how separation changes and identify what the model explains and distorts."],
    ["The universe has changed from an early hot, dense state.","Expansion, cosmic microwave background radiation and light-element abundance support the model.","Models and technologies connect observations to cosmic history."],
    ["Do not describe expansion as ordinary motion from a centre through pre-existing space.","Do not present current unknowns such as dark matter as proof the whole theory fails."]
  ),
  AC9S10U04:p(
    "Earth’s Energy Balance and Climate",
    "Energy flows among Earth’s spheres; changes to the energy balance help explain long-term climate patterns.",
    "Earth and space sciences","climate",
    ["incoming solar radiation","reflection and absorption","infrared emission","greenhouse effect","climate evidence and response"],
    ["Set the system boundary","Trace energy flows","Connect spheres","Test a changed balance"],
    ["Earth absorbs incoming solar energy and emits infrared energy.","Increasing greenhouse-gas concentration reduces the rate at which some outgoing infrared energy escapes.","An energy imbalance causes warming until flows move toward a new balance."],
    [["The greenhouse effect is a physical layer trapping heat.","Trace absorption and re-emission of infrared energy by atmospheric gases."],["One weather event proves or disproves climate change.","Use long-term patterns across multiple indicators and data sets."]],
    ["Students annotate an Earth energy-budget diagram with incoming, reflected, absorbed and emitted pathways.","Change one arrow and predict two sphere interactions."],
    ["Climate is driven by energy transfer among the atmosphere, hydrosphere, biosphere and geosphere.","Multiple long-term indicators show climate patterns and change.","Models support predictions but include uncertainty and assumptions."],
    ["Do not confuse weather with climate.","Do not omit natural drivers or misrepresent them as explaining the full recent trend."]
  ),
  AC9S10U05:p(
    "Newton’s Laws Quantify Motion",
    "Net force changes motion, and force, mass and acceleration are linked quantitatively by F = ma.",
    "Physical sciences","force",
    ["inertia","net force","action–reaction pair","F = ma","motion graph and safety"],
    ["Describe the motion","Identify all forces","Find net force","Quantify acceleration"],
    ["A 1200 kg car experiences 3600 N net force forward.","Using a = F/m gives 3.0 m/s² forward.","The acceleration direction follows net force; balanced vertical forces do not cancel the horizontal net force."],
    [["A moving object needs a forward net force to keep moving.","Use the first law: zero net force means constant velocity, not necessarily rest."],["Action and reaction forces cancel.","Place each force on its different interacting object."]],
    ["Draw a free-body diagram for a moving trolley before using any formula.","Students compare the acceleration when force doubles or mass doubles."],
    ["Newton’s laws relate force interactions to changes in motion.","Net force is the vector sum of forces on one object.","F = ma supports quantitative prediction and analysis."],
    ["Do not mix forces acting on different objects in one net-force calculation.","Do not treat speed and acceleration as interchangeable."]
  ),
  AC9S10U06:p(
    "Atomic Structure Explains Periodic Patterns",
    "Electron arrangements repeat across the periodic table, helping explain group patterns and element properties.",
    "Chemical sciences","periodic",
    ["proton number","electron shells","valence electrons","groups and periods","property pattern"],
    ["Read atomic structure","Locate the element","Compare a group","Explain the repeating pattern"],
    ["Sodium has electron arrangement 2,8,1 and chlorine 2,8,7.","Their positions reflect occupied shells and outer electrons.","Elements in the same group share outer-electron patterns and therefore show related chemical behaviour."],
    [["Elements in a group are identical.","Describe similar patterns alongside systematic changes down a group."],["The periodic table is ordered by atomic mass.","Use proton number as the modern organising sequence."]],
    ["Give students Bohr models without element names.","Infer period and group, then locate each element and predict one similarity."],
    ["Elements are organised by increasing proton number.","Periods relate to occupied electron shells and groups to recurring outer-electron patterns.","Atomic structure helps explain trends in physical and chemical properties."],
    ["Do not teach orbital notation or quantum numbers as the target.","Do not claim the simple Bohr model is a literal view of electrons."]
  ),
  AC9S10U07:p(
    "Reaction Patterns and Reaction Rate",
    "Reaction types show recurring rearrangements, while collision conditions affect how quickly reactions occur.",
    "Chemical sciences","reactionRate",
    ["synthesis","decomposition","displacement","collision model","temperature, concentration, surface area and catalyst"],
    ["Recognise the pattern","Represent the reaction","Model collisions","Test one rate factor"],
    ["Powdered calcium carbonate reacts faster than equal-mass chips with acid.","Powder exposes more surface particles, increasing successful collisions per second.","It changes rate, not the total theoretical product for the same reactant amounts."],
    [["A catalyst increases the amount of product.","Separate faster pathway from equilibrium amount in the selected reaction."],["Hotter particles become larger.","Model increased speed and collision frequency, not particle size."]],
    ["Use particle cards to classify one synthesis, decomposition and displacement pattern.","Then change one collision condition and predict its effect on rate."],
    ["Synthesis, decomposition and displacement reactions have recognisable reactant–product patterns.","Balanced representations conserve atoms.","Rate depends on the frequency of successful collisions and can be changed by key factors."],
    ["Do not introduce equilibrium kinetics or rate laws as the target.","Do not confuse faster reaction with greater final yield."]
  )
};

Object.assign(profiles,{
  AC9S8H01:p(
    "Evidence Changes Scientific Ideas","Scientific explanations change when new tools, observations or perspectives produce stronger evidence.",
    "Nature and development of science","timeline",
    ["earlier explanation","new evidence","challenge","revised model","stronger explanation"],
    ["State the earlier idea","Inspect the new evidence","Find the mismatch","Explain the revision"],
    ["Continental drift proposed moving continents but lacked a convincing mechanism.","Ocean-floor mapping, magnetic stripes and earthquake patterns supplied new evidence.","Plate tectonics explained both movement and the global pattern more successfully."],
    [["Science changes because facts are unreliable.","Show that explanations are revised to account for a larger, stronger evidence set."],["One surprising result automatically overturns a theory.","Require repeatable evidence, consistency and explanatory power."]],
    ["Give groups an ‘old idea’, ‘new evidence’ and ‘revised model’ card set.","Arrange the causal sequence and name the evidence that forced change."],
    ["Scientific knowledge is durable but open to revision.","New technologies and perspectives can reveal evidence unavailable earlier.","A revised explanation should account for existing and new evidence."],
    ["Do not present scientific change as a simple list of lone geniuses.","Do not imply every perspective has equal evidential support."]
  ),
  AC9S8H02:p(
    "World Views Shape Scientific Knowledge","Culture and world views influence which questions are asked, whose expertise is recognised and how knowledge develops.",
    "Nature and development of science","perspective",
    ["world view","question and priority","knowledge practice","collaboration","recognition and bias"],
    ["Identify the perspective","Locate its influence","Compare knowledge practices","Evaluate the outcome"],
    ["Earthquake-resistant building knowledge can develop through long cultural experience with local materials.","Engineering tests can examine why flexible bamboo structures perform well.","Respectful comparison can strengthen knowledge without erasing its cultural source."],
    [["Culture only obstructs science.","Identify both constraints and productive knowledge contributions."],["All cultural knowledge can be freely shared.","Apply attribution, permissions and cultural protocols to protected knowledge."]],
    ["Compare two accounts of the same scientific development and circle whose contribution is foregrounded.","Students identify one missing perspective and why it matters."],
    ["World views influence priorities, methods, interpretation and recognition.","Collaboration across perspectives can develop knowledge.","Cultural knowledge requires accurate attribution and appropriate protocols."],
    ["Do not generalise First Nations Australian knowledge as one uniform system.","Do not use cultural examples as decoration detached from their scientific contribution."]
  ),
  AC9S8H03:p(
    "Evaluate Scientific Responses","A proposed science-based response can produce benefits, risks and trade-offs across ethical, environmental, social and economic dimensions.",
    "Use and influence of science","decision",
    ["scientific response","benefit","risk","stakeholder","ethical, environmental, social and economic trade-off"],
    ["Define the issue","Explain the science","Map consequences","Justify a decision"],
    ["An earthquake early-warning system can give people seconds to act.","It may reduce harm but requires reliable infrastructure, public education and equitable access.","A justified response weighs evidence, cost, uncertainty and who is affected."],
    [["The scientifically possible option must be the best option.","Separate technical feasibility from values, cost, equity and environmental impact."],["Listing pros and cons is analysis.","Connect each consequence to evidence and a stakeholder."]],
    ["Place one contemporary response in the centre of a four-quadrant decision map.","Groups add one evidenced consequence to each dimension."],
    ["Scientific knowledge informs responses but does not make value decisions alone.","Consequences can differ among stakeholders and over time.","Recommendations should acknowledge evidence, uncertainty and trade-offs."],
    ["Do not force a single moral answer where evidence supports several defensible choices.","Do not present stakeholder viewpoints without evaluating their evidence."]
  ),
  AC9S8H04:p(
    "Science Communication Shapes Decisions","How scientific evidence is selected, framed and communicated can influence viewpoints, policy and regulation.",
    "Use and influence of science","communication",
    ["evidence source","message","medium","audience","viewpoint or policy"],
    ["Check the evidence","Identify the audience","Analyse the message","Trace its influence"],
    ["A tsunami alert converts seismic and ocean data into an urgent public message.","The audience needs a clear action, credible source, uncertainty level and accessible channel.","Good communication supports timely decisions without exaggerating certainty."],
    [["A famous communicator is automatically a reliable source.","Trace claims to evidence, expertise and transparent methods."],["Simplifying a message always makes it inaccurate.","Distinguish useful audience adaptation from distortion or omission."]],
    ["Rewrite one technical statement for a student, an emergency alert and a policy briefing.","Compare what changes and what scientific meaning must remain."],
    ["Purpose, audience and medium shape science communication.","Credibility depends on evidence and transparency, not popularity alone.","Communication can influence individual action and community policy."],
    ["Do not equate engagement with accuracy.","Do not teach persuasion techniques without checking evidence quality."]
  ),
  AC9S8I01:p(
    "Ask Questions Science Can Test","Investigable questions identify measurable variables; predictions and hypotheses give reasoned, testable expectations.",
    "Questioning and predicting","investigation",
    ["observation","investigable question","independent and dependent variable","prediction","reasoned hypothesis"],
    ["Observe a pattern","Name variables","Write a testable question","Reason a prediction"],
    ["Observation: brighter light appears to increase solar-cell output.","Question: How does light intensity affect electrical power from the same solar cell?","Hypothesis: Increasing light intensity will increase output because more light energy reaches the cell."],
    [["A topic is an investigable question.","Require a changed variable, measured response and defined system."],["A hypothesis is a guess.","Add a scientific reason linking the variables."]],
    ["Turn three broad topics into ‘How does X affect Y?’ questions.","Partners underline the variable changed and the variable measured."],
    ["Investigable questions can be answered with evidence.","Predictions state an expected pattern.","Hypotheses connect variables with scientific reasoning and can be tested."],
    ["Do not claim correlation automatically shows causation.","Do not require a hypothesis for purely descriptive investigations."]
  ),
  AC9S8I02:p(
    "Plan a Reproducible Investigation","A reproducible plan controls variables, states assumptions and manages risks, ethics and cultural responsibilities.",
    "Planning and conducting","method",
    ["question and variables","repeatable method","control and assumption","risk and ethics","Country/Place protocol"],
    ["Define the test","Control variables","Write repeatable steps","Check responsibilities"],
    ["To test light intensity and solar-cell output, vary measured distance from one lamp.","Keep cell angle, lamp, area and measurement interval constant and repeat each distance.","Record the assumption that distance is a suitable proxy for intensity and manage electrical and heat risks."],
    [["Repeating trials makes an unfair test fair.","Control relevant variables before repetition."],["A risk list is a risk assessment.","Link hazard → possible harm → control → residual risk."]],
    ["Give groups a flawed method with three missing controls.","Repair it so another class could reproduce the investigation."],
    ["Plans align variables, method and evidence with the question.","Assumptions and sources of risk are explicit.","Ethical and cultural protocols shape whether and how an investigation proceeds."],
    ["Do not treat cultural protocols as a generic permission checkbox.","Do not conduct investigations involving protected sites, materials or knowledge without authority."]
  ),
  AC9S8I03:p(
    "Measure with Useful Precision","Instrument choice, scale reading, units and recording conventions determine the precision and usefulness of data.",
    "Planning and conducting","measurement",
    ["quantity","instrument range","resolution","correct reading","recorded value and unit"],
    ["Choose the quantity","Match the instrument","Read the scale","Record honestly"],
    ["A measuring cylinder has 1 mL graduations.","Read the bottom of the meniscus at eye level and estimate one additional digit only when justified.","Record 36.5 mL rather than 36.500 mL or an unqualified 37."],
    [["More decimal places always means more precision.","Match recorded digits to instrument resolution."],["A digital display is automatically accurate.","Check calibration, range and method as well as display resolution."]],
    ["Set out images of instruments with different ranges and scales.","Students choose the best instrument for three measurements and justify precision."],
    ["Equipment range and resolution must suit the quantity.","Measurements use correct scale-reading conventions.","Data tables record units and precision consistently."],
    ["Do not invent extra decimal places.","Do not use ‘accuracy’ and ‘precision’ as interchangeable terms."]
  ),
  AC9S8I04:p(
    "Choose a Representation That Reveals the Pattern","Tables, graphs, models and mathematical relationships organise information for different scientific purposes.",
    "Processing, modelling and analysing","representation",
    ["data type","table","graph","model or equation","strength and limitation"],
    ["Identify the data purpose","Select a representation","Apply conventions","Evaluate what it reveals"],
    ["Distance from a lamp is the independent variable and goes on the horizontal axis.","Solar-cell power is the dependent variable and goes on the vertical axis with units.","A scatter graph reveals the relationship more clearly than a decorative chart."],
    [["Any graph type can show the same data.","Match continuous, categorical, temporal or spatial data to the purpose."],["A model is useful only if it is realistic.","Evaluate whether it makes the target relationship visible and note what it omits."]],
    ["Give one data set and four representation options.","Students choose, construct the essential conventions and defend the choice."],
    ["Representation choice depends on data type and question.","Conventions make tables and graphs interpretable.","Every representation highlights some relationships and hides others."],
    ["Do not use truncated axes without clearly signalling them.","Do not turn graphing into decoration detached from analysis."]
  ),
  AC9S8I05:p(
    "Find Patterns Without Ignoring Anomalies","Analysis describes patterns, trends and relationships while testing whether anomalies or alternative explanations matter.",
    "Processing, modelling and analysing","data",
    ["data set","pattern","trend","relationship","anomaly and explanation"],
    ["Inspect the distribution","Describe the pattern","Locate anomalies","Test the explanation"],
    ["Solar output generally rises with light intensity, but one trial is much lower.","Report the overall positive relationship and identify the anomalous point.","Check shading, connection and measurement records before excluding or repeating the value."],
    [["An anomaly should be deleted.","Investigate it and justify any treatment transparently."],["Two variables moving together proves causation.","Check design, confounding factors and mechanism."]],
    ["Display a small graph with one outlier.","Students write one pattern sentence, identify the anomaly and propose a check."],
    ["Patterns and trends are described with direction and evidence.","Anomalies are identified and investigated.","Causal claims require more than correlation."],
    ["Do not hide inconvenient data.","Do not report a mean alone when the distribution or outliers matter."]
  ),
  AC9S8I06:p(
    "Test the Method and the Claim","Scientific evaluation checks assumptions, errors, conflicting evidence and unanswered questions before accepting a conclusion.",
    "Evaluating","evaluation",
    ["method","assumption","source of error","evidence conflict","conclusion and next question"],
    ["Restate the claim","Audit the method","Compare evidence","Set a justified confidence level"],
    ["A group claims light intensity alone caused higher solar output.","Their lamp also warmed the cell, so temperature was an uncontrolled variable.","The conclusion should be narrowed and the test repeated with temperature monitored or controlled."],
    [["Human error explains every problem.","Name the exact procedure, measurement or control and its likely effect."],["A result that matches the prediction proves the method valid.","Evaluate design and evidence independently of the desired outcome."]],
    ["Give students a short claim plus method and results.","Annotate one assumption, one error source, one conflicting possibility and one follow-up question."],
    ["Evaluation links a specific limitation to its effect on evidence.","Conflicting results and assumptions affect confidence.","Conclusions stay within the data and identify useful next questions."],
    ["Do not use vague ‘more accurate’ improvements.","Do not reject a conclusion merely because uncertainty exists."]
  ),
  AC9S8I07:p(
    "Build an Evidence-Based Argument","A scientific argument links a clear claim to relevant, credible evidence through explicit reasoning and responsible citation.",
    "Evaluating","argument",
    ["claim","source quality","evidence","reasoning","ethical citation and conclusion"],
    ["Clarify the claim","Evaluate sources","Select evidence","Explain the link"],
    ["Claim: Battery A lasts longer under the tested load.","Use repeated discharge times, variability and a clearly controlled comparison rather than advertising.","Reasoning explains why the data support the limited tested claim and what remains uncertain."],
    [["More sources automatically means stronger evidence.","Prioritise relevance, method quality and independent corroboration."],["A quotation is reasoning.","Explain how the evidence supports or weakens the claim."]],
    ["Give a claim and four evidence cards of mixed quality.","Students select two, reject two and write the reasoning link."],
    ["Arguments distinguish claim, evidence and reasoning.","Evidence quality and competing explanations are evaluated.","Sources and culturally governed information are used with attribution and protocol."],
    ["Do not use restricted cultural information without permission.","Do not overgeneralise beyond the evidence population and conditions."]
  ),
  AC9S8I08:p(
    "Communicate Science for a Purpose","Effective scientific texts select accurate content, language and representations for a defined purpose and audience.",
    "Communicating","communication",
    ["purpose","audience","scientific content","language and structure","visual or digital feature"],
    ["Set purpose and audience","Select evidence","Choose the text form","Review meaning and accessibility"],
    ["A laboratory report needs reproducible method, data and cautious evaluation.","A public energy infographic needs accurate comparisons, readable units and a clear takeaway.","Both preserve the science while changing structure, voice and detail."],
    [["Simpler language means removing evidence.","Keep the scientific relationship and adapt vocabulary and structure."],["Passive voice is always more scientific.","Choose active or passive voice according to clarity, focus and convention."]],
    ["Transform one result into a report sentence, infographic caption and 20-second oral explanation.","Peers check that the conclusion remains unchanged."],
    ["Content selection matches purpose and audience.","Scientific conventions, units and evidence remain accurate.","Digital and visual features clarify rather than decorate."],
    ["Do not imply one text form suits every audience.","Do not use engagement features that distort scale, uncertainty or causation."]
  )
});

const bandPairs={
  H01:{
    title:"How Science Is Validated and Refined",subtitle:"Publication, scrutiny, replication and converging evidence strengthen—or revise—scientific claims.",strand:"Nature and development of science",component:"peerReview",labels:["research question","method and data","publication","peer scrutiny","replication and refinement"],progression:["Follow the claim","Inspect the evidence","Apply scrutiny","Revise confidence"],
    y9Worked:["Marshall and Warren proposed that bacteria cause many peptic ulcers.","Initial rejection was followed by published evidence, independent testing and treatment success.","The explanation became accepted because multiple evidence lines survived scrutiny."],
    y10Worked:["Franklin’s X-ray diffraction evidence constrained possible DNA structures.","Publication and comparison with chemical evidence supported the double-helix model.","Validation depended on evidence and reproducibility, while historical credit also requires examination."],
    misconceptions:[["Peer review proves a paper is true.","Treat it as one quality-control stage followed by replication and continuing scrutiny."],["Consensus is a vote detached from evidence.","Connect consensus to independent, converging evidence and expert evaluation."]],
    y9Warm:["Students act as editor, reviewer and replicating team for a short fictional claim.","Each role records one question that changes confidence."],y10Warm:["Compare an abstract, peer-review comment and replication result.","Students update a confidence scale and justify each move."],
    mustTeach:["Publication makes methods and findings available for scrutiny.","Peer review evaluates quality but does not guarantee correctness.","Replication and converging evidence validate, refine or challenge knowledge."],mustNot:["Do not present peer review as a truth certificate.","Do not equate one non-replication automatically with fraud."]
  },
  H02:{
    title:"Science and Technology Advance Together",subtitle:"New tools create new observations, while scientific understanding enables new technologies and engineering.",strand:"Nature and development of science",component:"technology",labels:["scientific question","technology","new data","new explanation","engineering application"],progression:["Identify the limitation","Trace the new tool","Explain the new evidence","Follow the application"],
    y9Worked:["Particle accelerators enabled controlled collisions and new particle evidence.","Scientific models guided detector design and interpretation.","Improved detectors then produced data that refined the models."],
    y10Worked:["Fast computing makes large DNA data sets and radio-astronomy signals analysable.","Algorithms convert raw signals into patterns scientists can test.","New scientific questions then drive faster computing, sensors and data systems."],
    misconceptions:[["Technology is only applied science.","Trace feedback in both directions between tool and knowledge."],["A more advanced instrument removes uncertainty.","Identify new sensitivity alongside calibration, sampling and interpretation limits."]],
    y9Warm:["Build a two-way arrow diagram for microscope ↔ cell science or satellite ↔ Earth science.","Label one advance in each direction."],y10Warm:["Choose DNA sequencing, climate modelling or astronomy.","Trace tool → data → knowledge → improved tool in four steps."],
    mustTeach:["Technologies extend observation, measurement and analysis.","Scientific knowledge informs engineering design.","Science–technology relationships are iterative and include limitations."],mustNot:["Do not describe technological progress as automatic or value-free.","Do not claim bigger data alone produces better explanations."]
  },
  H03:{
    title:"Why Society Adopts Scientific Practices",subtitle:"Evidence, trust, access, values, policy and perceived benefit influence whether science-related practices are adopted.",strand:"Use and influence of science",component:"adoption",labels:["evidence strength","benefit and risk","trust","access and cost","values and policy"],progression:["Define the practice","Evaluate evidence","Map adoption factors","Explain variation"],
    y9Worked:["A vaccination program may have strong effectiveness and safety evidence.","Adoption also depends on access, trusted messengers, cost, policy and community experience.","Different uptake does not by itself show different biological effectiveness."],
    y10Worked:["Genetic screening may identify inherited risk.","Adoption depends on test validity, counselling, privacy, cost, values and possible discrimination.","A responsible explanation separates scientific capability from social acceptability."],
    misconceptions:[["Strong evidence guarantees rapid adoption.","Add trust, access, incentives, regulation and values to the model."],["Low adoption proves the science is weak.","Test several adoption factors before inferring the cause."]],
    y9Warm:["Rank five factors affecting adoption of a public-health practice.","Use a scenario change to show why the ranking is contextual."],y10Warm:["Use a stakeholder map for genetic screening or low-emission transport.","Annotate one adoption enabler and barrier for each group."],
    mustTeach:["Adoption is influenced by scientific and social factors.","Evidence quality is essential but not sufficient.","Adoption patterns can vary among groups and over time."],mustNot:["Do not label communities as anti-science without evidence.","Do not treat adoption as proof that a claim is scientifically valid."]
  },
  H04:{
    title:"How Society Shapes Research Priorities",subtitle:"Needs, values, funding, ethics and power influence which scientific questions receive attention.",strand:"Use and influence of science",component:"researchPriority",labels:["societal need","value or concern","funding and capacity","research question","benefit and opportunity cost"],progression:["Identify the need","Locate influence","Trace the funding choice","Evaluate consequences"],
    y9Worked:["Increasing antibiotic resistance creates a health need for new diagnostics and treatments.","Public funding, commercial incentives and equity goals shape research programs.","Prioritising one approach also creates an opportunity cost for alternatives."],
    y10Worked:["Climate risk can direct funding toward modelling, mitigation materials and adaptation.","Government, community and commercial values influence targets and timeframes.","Research choices should be examined for benefit, equity and neglected needs."],
    misconceptions:[["Scientists freely choose research without constraints.","Map funding, infrastructure, ethics, regulation and community need."],["Funded research is automatically biased or invalid.","Separate influence on topic choice from evaluation of method and evidence."]],
    y9Warm:["Allocate a fictional research budget across three health priorities.","Students justify criteria and name one opportunity cost."],y10Warm:["Compare two calls for research funding.","Highlight whose needs are visible, whose are missing and what evidence guides priority."],
    mustTeach:["Societal needs and values influence research focus.","Funding and infrastructure enable some questions and constrain others.","Priority decisions have benefits, ethical dimensions and opportunity costs."],mustNot:["Do not imply all funding influence invalidates findings.","Do not treat ‘society’ as one group with one value set."]
  },
  I01:{
    title:"Develop Testable Explanatory Questions",subtitle:"Questions, predictions and hypotheses connect measurable relationships to an explanatory model.",strand:"Questioning and predicting",component:"investigation",labels:["observation","question","variables","hypothesis","model-based prediction"],progression:["Observe carefully","Define variables","Propose a mechanism","Predict a pattern"],
    y9Worked:["A tablet appears to dissolve faster in warm water.","Question: How does water temperature affect dissolution time for identical tablets?","Hypothesis: Higher temperature decreases time because faster particle motion increases interactions."],
    y10Worked:["A trolley’s acceleration changes when added mass changes.","Question: How does total mass affect acceleration under constant net force?","Hypothesis: Acceleration decreases as mass increases because a = F/m."],
    misconceptions:[["A prediction and hypothesis are identical.","Use prediction for expected outcome and hypothesis for the reasoned explanatory relationship."],["A testable question must always be causal.","Distinguish descriptive, relational and causal questions." ]],
    y9Warm:["Rewrite a broad chemical-rate topic as a variable question and reasoned hypothesis.","Partner-check measurability."],y10Warm:["From a motion graph, write one question, one hypothesis and one quantitative prediction.","Label which part comes from the model."],
    mustTeach:["Questions identify measurable relationships or model tests.","Hypotheses include scientific reasoning.","Predictions follow logically from a hypothesis under stated conditions."],mustNot:["Do not state causation from observational correlation alone.","Do not force every inquiry into an ‘if–then–because’ sentence when another precise form is clearer."]
  },
  I02:{
    title:"Design Valid, Reproducible Investigations",subtitle:"A strong plan aligns variables, controls, sampling, risk, ethics and cultural responsibilities with the question.",strand:"Planning and conducting",component:"method",labels:["question","variables and controls","sampling and repeats","risk and ethics","reproducible method"],progression:["Align the design","Control confounding factors","Plan useful data","Complete responsibility checks"],
    y9Worked:["To test temperature and reaction rate, measure gas volume over time at several temperatures.","Keep reactant amounts, concentration, apparatus and mixing consistent, and repeat each condition.","Control heat and chemical hazards and specify how rate will be calculated."],
    y10Worked:["To test net force and acceleration, use a calibrated motion sensor and several controlled force levels.","Keep total mass and track conditions constant, randomise run order where useful and collect repeated data.","Plan calibration checks and quantify uncertainty before testing."],
    misconceptions:[["Many repeats fix systematic bias.","Use calibration and design changes for bias; repeats mainly estimate random variation."],["A detailed method is automatically valid.","Check whether the evidence can actually answer the question." ]],
    y9Warm:["Repair a rate experiment that changes temperature and concentration together.","Add repeats, risk controls and a clear data plan."],y10Warm:["Audit a motion investigation for confounding variables, calibration and sample size.","Rewrite the three weakest steps."],
    mustTeach:["Validity depends on alignment and control of relevant variables.","Reproducibility requires transparent procedures and useful sample sizes.","Risk, ethics and Country/Place protocols can change or prevent a method."],mustNot:["Do not treat repetition as a cure for every design problem.","Do not access heritage material, sites or knowledge without correct authority and protocols."]
  },
  I03:{
    title:"Collect Precise, Replicable Data",subtitle:"Calibration, resolution, sample size and consistent technique determine whether measurements can support a conclusion.",strand:"Planning and conducting",component:"measurement",labels:["calibration","range and resolution","consistent technique","sample size","replicable record"],progression:["Set the instrument","Measure consistently","Build the sample","Record uncertainty"],
    y9Worked:["A balance reads to 0.01 g but is not zeroed.","Repeated readings may be precise yet all systematically shifted.","Zeroing with a known check mass addresses calibration before collecting a useful sample."],
    y10Worked:["A motion sensor samples position many times per second.","Calibration and consistent release reduce systematic differences between runs.","Enough independent runs are needed to estimate variation, not merely thousands of points from one run."],
    misconceptions:[["A large data file means a large sample.","Count independent experimental units or trials, not sensor rows."],["Calibration and zeroing are the same for every instrument.","Use the manufacturer or laboratory procedure appropriate to the instrument." ]],
    y9Warm:["Choose instruments for mass, time and temperature measurements.","Match each to a justified resolution and sample plan."],y10Warm:["Compare three sampling plans with the same number of readings.","Choose the most replicable and explain independence."],
    mustTeach:["Calibration and instrument limits affect measurement quality.","Consistent procedures improve replicability.","Useful sample size depends on variation and independent evidence."],mustNot:["Do not confuse number of digital samples with independent repeats.","Do not claim precise measurements are necessarily accurate."]
  },
  I04:{
    title:"Represent Data Without Distortion",subtitle:"Tables, graphs, statistics, models and equations should reveal the relevant relationship and communicate uncertainty honestly.",strand:"Processing, modelling and analysing",component:"representation",labels:["data purpose","table or graph","descriptive statistic","model or equation","scale and limitation"],progression:["Define the message","Select the form","Apply conventions","Test interpretation"],
    y9Worked:["Reaction time falls as temperature rises.","A scatter graph with temperature on x and time on y reveals the relationship; mean and range summarise repeats.","The axis scale must show variation without exaggerating it."],
    y10Worked:["A force–acceleration graph tests F = ma for constant mass.","A fitted relationship and uncertainty show whether data support proportionality.","Starting an axis away from zero may be defensible but must not hide scale or imply a false effect."],
    misconceptions:[["The representation with the most features is best.","Choose the simplest form that answers the question without hiding uncertainty."],["Changing an axis only changes appearance.","Compare how scale changes perceived magnitude and slope." ]],
    y9Warm:["Match four data sets to a table, line graph, scatter graph or column graph.","Add one sentence explaining the purpose."],y10Warm:["Redesign a misleading graph and calculate one useful descriptive statistic.","Explain how interpretation changes."],
    mustTeach:["Representation choice is purpose- and data-dependent.","Conventions and scale affect interpretation.","Statistics and models summarise evidence but have limitations."],mustNot:["Do not use visual effects that distort magnitude.","Do not report statistics without units, context or distribution where relevant."]
  },
  I05:{
    title:"Connect Evidence Across Data Sets",subtitle:"Analysis explains patterns, relationships and anomalies by comparing data sources and scientific models.",strand:"Processing, modelling and analysing",component:"data",labels:["source A","source B","shared pattern","anomaly","model-based explanation"],progression:["Describe each data set","Align variables and scales","Find convergence or conflict","Explain with a model"],
    y9Worked:["Two reaction-rate trials show faster gas production at higher temperature, but one run plateaus early.","The shared early slope supports a rate relationship; the early plateau suggests a leak or limiting reactant difference.","Analysis keeps the relationship and investigates the anomaly."],
    y10Worked:["Fossil sequence, homologous structures and DNA similarity show related patterns among species.","No single line is complete, but convergence supports common ancestry.","Conflicts prompt checks of dating, sampling or the evolutionary model rather than silent removal."],
    misconceptions:[["Different sources can be averaged immediately.","Check units, definitions, sampling and comparability first."],["An anomaly invalidates the whole data set.","Test its cause and influence on the relationship." ]],
    y9Warm:["Overlay two small rate graphs and mark one agreement and one conflict.","Write a cautious explanatory sentence."],y10Warm:["Triangulate three evolution or climate evidence cards.","Build one conclusion and one uncertainty statement."],
    mustTeach:["Comparable data can reveal converging patterns or conflicts.","Anomalies and uncertainty affect interpretation.","Explanations connect data patterns to scientific mechanisms or models."],mustNot:["Do not combine incompatible data without transformation or caveat.","Do not infer cause from pattern alone without design or mechanism."]
  },
  I06:{
    title:"Judge Validity, Reproducibility and Claims",subtitle:"Evaluation distinguishes error types, assumptions and uncertainty to decide how strongly evidence supports a conclusion.",strand:"Evaluating",component:"evaluation",labels:["method validity","reproducibility","random and systematic error","assumption","claim confidence"],progression:["Check alignment","Diagnose error","Quantify uncertainty","Constrain the claim"],
    y9Worked:["A group concludes a catalyst increases final product because gas formed faster during the first minute.","The method measures rate, not necessarily final yield, and one apparatus leaked.","A valid conclusion is limited to faster initial gas production under the tested conditions."],
    y10Worked:["A media report claims one small observational study proves a food prevents disease.","Confounding variables, sample selection and effect uncertainty weaken causal inference.","The evidence may justify further study, not the headline claim."],
    misconceptions:[["Random error means a careless person made a mistake.","Describe unpredictable measurement variation; separate systematic bias."],["Reproducible results prove the explanation.","A consistently biased method can reproduce the wrong value." ]],
    y9Warm:["Label four method problems as validity, reliability or measurement issues.","Rewrite the conclusion boundary."],y10Warm:["Evaluate a headline against a method and confidence interval.","Rate the claim as supported, partly supported or unsupported and justify."],
    mustTeach:["Validity concerns whether the design supports the intended inference.","Reproducibility and error patterns affect confidence.","Conclusions must reflect assumptions, uncertainty and conflicting evidence."],mustNot:["Do not call every difference ‘human error’.","Do not use uncertainty as a reason to treat all claims as equally plausible."]
  },
  I07:{
    title:"Argue from Multiple Lines of Evidence",subtitle:"Strong scientific arguments synthesise credible evidence, address alternatives and observe ethical and cultural protocols.",strand:"Evaluating",component:"argument",labels:["claim","evidence set","source credibility","reasoning and rebuttal","ethical use and boundary"],progression:["Define the claim","Triangulate evidence","Address alternatives","State a bounded conclusion"],
    y9Worked:["Claim: A local lake’s algal bloom is linked to nutrient runoff.","Water chemistry, rainfall timing and land-use data converge, while temperature is an alternative influence.","A strong argument weighs each line and proposes further sampling."],
    y10Worked:["Claim: The universe has expanded from an early hot, dense state.","Galaxy redshift, cosmic microwave background radiation and light-element abundance provide independent support.","Reasoning explains convergence and acknowledges questions the evidence does not settle."],
    misconceptions:[["A persuasive tone strengthens scientific evidence.","Evaluate data quality and reasoning before rhetoric."],["Acknowledging uncertainty weakens an argument.","Use uncertainty to set an honest conclusion boundary." ]],
    y9Warm:["Sort lake-evidence cards by relevance and credibility.","Build a claim–evidence–reasoning paragraph with one alternative."],y10Warm:["Construct a three-evidence argument for a universe, evolution or climate claim.","Add one rebuttal and one ethical citation check."],
    mustTeach:["Arguments synthesise multiple credible evidence lines.","Reasoning addresses alternatives and limitations.","Secondary evidence is accessed and cited ethically, including cultural protocols."],mustNot:["Do not use culturally restricted information without permission.","Do not hide counter-evidence or exceed the evidence boundary."]
  },
  I08:{
    title:"Create Effective Scientific Texts",subtitle:"Content, language, structure and digital features are selected to communicate evidence accurately to an identified audience.",strand:"Communicating",component:"communication",labels:["purpose","audience","evidence selection","language and structure","digital feature and review"],progression:["Define audience and purpose","Select the evidence","Design the text","Review accuracy and impact"],
    y9Worked:["A results report foregrounds method, data and uncertainty for scientific readers.","A community water-quality update foregrounds meaning, risk and action while retaining units and evidence limits.","Both use the same findings without making the same text."],
    y10Worked:["A policy brief on school-zone speed uses force and stopping-distance evidence, a concise graph and a qualified recommendation.","A technical appendix supplies method and uncertainty.","Layered communication serves decision-makers without hiding the scientific basis."],
    misconceptions:[["Audience adaptation permits changing the conclusion.","Change explanation depth and form, not the supported meaning."],["More technical vocabulary is more scientific.","Prefer precise language the audience can interpret." ]],
    y9Warm:["Convert one investigation conclusion into a caption, report paragraph and spoken update.","Check that evidence boundaries match."],y10Warm:["Draft a 60-word policy brief and choose one data visual.","Peers audit precision, accessibility and overclaiming."],
    mustTeach:["Purpose and audience guide content and form.","Scientific representations and conventions remain accurate.","Editing checks evidence, uncertainty, accessibility and ethical attribution."],mustNot:["Do not simplify by removing essential uncertainty or units.","Do not use visual drama that exaggerates effects."]
  }
};

for(const [suffix,q] of Object.entries(bandPairs)){
  profiles[`AC9S9${suffix}`]=p(q.title,q.subtitle,q.strand,q.component,q.labels,q.progression,q.y9Worked,q.misconceptions,q.y9Warm,q.mustTeach,q.mustNot);
  profiles[`AC9S10${suffix}`]=p(q.title,q.subtitle,q.strand,q.component,q.labels,q.progression,q.y10Worked,q.misconceptions,q.y10Warm,q.mustTeach,q.mustNot);
}

