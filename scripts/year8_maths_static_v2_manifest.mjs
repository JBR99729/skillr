export const YEAR8_MATHS_EXPECTED_CODES = [
  ...Array.from({length:5},(_,i)=>`AC9M8N0${i+1}`),
  ...Array.from({length:4},(_,i)=>`AC9M8A0${i+1}`),
  ...Array.from({length:7},(_,i)=>`AC9M8M0${i+1}`),
  ...Array.from({length:4},(_,i)=>`AC9M8SP0${i+1}`),
  ...Array.from({length:4},(_,i)=>`AC9M8ST0${i+1}`),
  ...Array.from({length:3},(_,i)=>`AC9M8P0${i+1}`)
];

export const YEAR8_MATHS_V2_MIGRATED = [
  {code:'AC9M8N01',slug:'ac9m8n01-irrational-numbers-in-applied-contexts-including-square-roots',differentiation:true,victoria:{code:'VC2M8N01',relationship:'Exact'},nsw:{code:'MA4-IND-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8N02',slug:'ac9m8n02-establish-and-apply-the-exponent-laws-with-positive-integer',differentiation:true,victoria:{code:'VC2M8N02',relationship:'Exact'},nsw:{code:'MA4-IND-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8N03',slug:'ac9m8n03-terminating-and-recurring-decimals-using-digital-tools-as',differentiation:true,victoria:{code:'VC2M8N03',relationship:'Partial'},nsw:{code:'MA4-FRC-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8N04',slug:'ac9m8n04-the-4-operations-with-integers-and-with-rational-numbers',differentiation:true,victoria:{code:'VC2M8N04',relationship:'Exact'},nsw:{code:'MA4-INT-C-01; MA4-FRC-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8N05',slug:'ac9m8n05-mathematical-modelling-to-solve-practical-problems-involving',differentiation:true,victoria:{code:'VC2M8N06',relationship:'Exact'},nsw:{code:'MA4-FRC-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8A01',slug:'ac9m8a01-create-expand-factorise-rearrange-and-simplify-linear',differentiation:false,victoria:{code:'VC2M8A01',relationship:'Exact'},nsw:{code:'MA4-ALG-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8A02',slug:'ac9m8a02-graph-linear-relations-on-the-cartesian-plane-using-digital',differentiation:false,victoria:{code:'VC2M8A02',relationship:'Exact'},nsw:{code:'MA4-EQU-C-01; MA4-LIN-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8A03',slug:'ac9m8a03-mathematical-modelling-to-solve-applied-problems-involving',differentiation:false,victoria:{code:'VC2M8A03',relationship:'Exact'},nsw:{code:'MA4-LIN-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8A04',slug:'ac9m8a04-experiment-with-linear-functions-and-relations-using-digital',differentiation:false,victoria:{code:'VC2M8A05',relationship:'Exact'},nsw:{code:'MA4-LIN-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8M01',slug:'ac9m8m01-solve-problems-involving-the-area-and-perimeter-of-irregular-and',differentiation:true,victoria:{code:'VC2M8M01',relationship:'Exact'},nsw:{code:'MA4-LEN-C-01; MA4-ARE-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8M02',slug:'ac9m8m02-solve-problems-involving-the-volume-and-capacity-of-right-prisms',differentiation:true,victoria:{code:'VC2M8M02',relationship:'Exact'},nsw:{code:'MA4-VOL-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8M03',slug:'ac9m8m03-solve-problems-involving-the-circumference-and-area-of-a-circle',differentiation:true,victoria:{code:'VC2M8M03',relationship:'Exact'},nsw:{code:'MA4-LEN-C-01; MA4-ARE-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8M04',slug:'ac9m8m04-solve-problems-involving-duration-including-using-12-and-24',differentiation:true,victoria:{code:'VC2M8M04',relationship:'Exact'},nsw:{code:'MA4-RAT-C-01; MAO-WM-01',relationship:'Supporting'}},
  {code:'AC9M8M05',slug:'ac9m8m05-and-use-rates-to-solve-problems-involving-the-comparison-of',differentiation:true,victoria:{code:'VC2M8M05',relationship:'Exact'},nsw:{code:'MA4-RAT-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8M06',slug:'ac9m8m06-pythagoras-theorem-to-solve-problems-involving-the-side-lengths',differentiation:true,victoria:{code:'VC2M8M06',relationship:'Exact'},nsw:{code:'MA4-PYT-C-01; MAO-WM-01',relationship:'Exact'}},
  {code:'AC9M8M07',slug:'ac9m8m07-mathematical-modelling-to-solve-practical-problems-involving',differentiation:true,victoria:{code:'VC2M8M07',relationship:'Exact'},nsw:{code:'MA4-RAT-C-01; MA4-FRC-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8SP01',slug:'ac9m8sp01-the-conditions-for-congruence-and-similarity-of-triangles-and',differentiation:true,victoria:{code:'VC2M8SP01',relationship:'Exact'},nsw:{code:'MA4-GEO-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8SP02',slug:'ac9m8sp02-establish-properties-of-quadrilaterals-using-congruent',differentiation:true,victoria:{code:'VC2M8SP02',relationship:'Exact'},nsw:{code:'MA4-GEO-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8SP03',slug:'ac9m8sp03-the-position-and-location-of-objects-in-3-dimensions-in',differentiation:true,victoria:{code:'VC2M8SP03',relationship:'Exact'},nsw:{code:'MAO-WM-01',relationship:'Supporting'}},
  {code:'AC9M8SP04',slug:'ac9m8sp04-design-create-and-test-algorithms-involving-a-sequence-of-steps',differentiation:true,victoria:{code:'VC2M8SP04',relationship:'Exact'},nsw:{code:'MA4-GEO-C-01; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8ST01',slug:'ac9m8st01-investigate-techniques-for-data-collection-including-census',differentiation:true,victoria:{code:'VC2M8ST01',relationship:'Exact'},nsw:{code:'MA4-DAT-C-01; MA4-DAT-C-02; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8ST02',slug:'ac9m8st02-analyse-and-report-on-the-distribution-of-data-from-primary',differentiation:true,victoria:{code:'VC2M8ST02',relationship:'Exact'},nsw:{code:'MA4-DAT-C-01; MA4-DAT-C-02; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8ST03',slug:'ac9m8st03-variations-in-distributions-and-proportions-obtained-from',differentiation:true,victoria:{code:'VC2M8ST03',relationship:'Exact'},nsw:{code:'MA4-DAT-C-02; MAO-WM-01',relationship:'Partial'}},
  {code:'AC9M8ST04',slug:'ac9m8st04-plan-and-conduct-statistical-investigations-involving-samples',differentiation:true,victoria:{code:'VC2M8ST04',relationship:'Exact'},nsw:{code:'MA4-DAT-C-01; MA4-DAT-C-02; MAO-WM-01',relationship:'Partial'}}
];
