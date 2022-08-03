---
layout: page
title: NYUMets Docs
---

<style>
    .medic{
        background-color: rgb(198, 224, 180);
    }
    .gk{
        background-color: rgb(255, 230, 153);
    }
    .image{
        background-color: rgb(248, 203, 173);
    }
    .fu_appt{
        background-color: rgb(180, 198, 231);
    }
    .death{
        background-color: rgb(184, 172, 234);
    }
    th, td{
        border-bottom: 1px solid #ddd;
    }
    th{
        color: rgb(64, 64, 64);
        background-color: rgb(234, 234, 234);
        font-weight: bold;
    }
    table{
        width: 100%;
        font-size: 0.8em;
    }

    .title{
        color: rgb(64, 64, 64);
        font-weight: bold;
    }
    .note{
        font-size: 0.8em;
        padding-left: 15px
    }
</style>

<h2>Clinical Data</h2>
<p> NYUMets de-identified clinical data is divided into three datasets with feature details viewable below:<br>
<ul>
    <li><a href="#time_series">Time Series Dataset</a> - Each row in the time series dataset represents a point in time, in units of days indexed from each patient’s initial gamma knife radiosurgery. Dataset variables include clinical details related to medication changes, imaging timing/references to raw imaging files, procedure timing, clinical follow up, and outcomes. </li>
    <li><a href="#individual_dataset"> Individual Dataset </a> - Each row represents an individual patient with demographic details and summary clinical data.</li>
    <li><a href="#gk_details">Gamma Knife Details Dataset</a> - Each row represents an individual gamma knife target to provide further details about available gamma knife radiosurgery.</li>
    <br>
</ul>
<div id="time_series" class="title">
    <h3> Time Series Dataset </h3>
</div>
<div>
<table>
    <tr>
            <th> Variable </th>
            <th> Type </th>
            <th> Key </th>
            <th> Description </th>
    </tr>
    <tr>
        <td> patient_identifier </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 8-digit identifier unique to each patient </td>
    </tr>
    <tr></tr>
    <tr>
        <td> visit_class </td>
        <td> int </td>
        <td> 
        <span class="medic"> 1 = Medication </span><br><span class="gk"> 2 = Gamma Knife </span> <br> <span class="image"> 3 = Image </span> <br> <span class="fu_appt"> 4 = Follow Up </span> <br> <span class="death"> 5 = Death </span>
        </td>
        <td>
            Identifies type of visit corresponding to each row/point in time, each with distinct variables related to that event (color coded): 
        <ul>
                <li> Medication event is an update to a patient's ordered medications</li>
                <li> Gamma Knife indicates a gamma knife procedure</li>
                <li> Image corresponds to a Brain MRI</li>
                <li> Follow Up corresponds to an office appointment with associated clinical data from that visit</li>
                <li> Death reports details related to a patient's death</li>
        </ul></td>
    </tr>
    <tr></tr>
    <tr>
        <td> time_from_gk_days </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time indexed from initial gamma knife procedure in days </td>
    </tr>
    <tr></tr>
    <tr>
        <td> time_from_diagnosis_days </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time indexed from primary cancer diagnosis in days </td>
    </tr>
    <tr class="medic">
        <td> med_list_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of medication list events indexed from 1, per patient </td>
     </tr>
     <tr></tr>
     <tr class="medic">   
        <td> medications </td>
        <td> string </td>
        <td> <br> </td>
        <td> List of medications at specified time point, comma-separated </td>
    </tr>
    <tr></tr>
    <tr class="image">   
        <td> image_id </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 10-digit identifier unique to each cranial imaging and corresponding to imaging dataset </td>
    </tr>
    <tr></tr>
    <tr class="image">   
        <td> image_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of cranial imaging events indexed from 1, per patient </td>
    </tr>
    <tr></tr>
    <tr class="image">   
        <td> image_available </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether associated raw imaging data is available in imaging dataset </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_id </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 9-digit identifier unique to each gamma knife procedure, corresponding to gamma knife details dataset </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_detail </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether specified gamma knife procedure has corresponding data in the gamma knife details dataset </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of gamma knife procedures indexed from 1, per patient  </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> total_vol_all_targets </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume in cubic centimeters of all gamma knife targets from procedure specified in that row </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_gk_targets </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of targets from specified gamma knife plan <br> <span class="note"> (note: target number may not be the same as number of tumors - a large irregular tumor could require multiple targets and multiple, nearby tumors could be captured by a single target) </span> </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> total_num_tumors_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of tumors targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_lobar_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in cerebrum targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_brainstem_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in brainstem targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_thal_bg_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in thalamus or basal ganglia targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_cerebellum_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in cerebellum targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_skull_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in the calvarium targeted by specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> xdimension_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Linear measurement in millimeters along x-axis of largest tumor in specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> ydimension_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Linear measurement in millimeters along y-axis of largest tumor in specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> zdimension_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Linear measurement in millimeters along z-axis of largest tumor in specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> max_linear_dimension_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Maximum linear measurement in millimeters along any dimension of largest tumor in specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> target_volume_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume of largest outlined target in cubic centimeters from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> planned_isodose_volume_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Planed Isodose Volume (PIV) in cubic centimeters of the largest target from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> coverage_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Proportion of outlined target covered in largest planned isodose volume from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> pci_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Paddick Conformity Index (PCI) of the largest target from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gri_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Gradient index of the largest target from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> margin_dose_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Margin dose in unit Gray of the largest target from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> percent_isodose_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Prescription isodose line in percentage of the largest target from specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> volume_12gy_largest </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume of tissue in cubic centimeters that received 12 Gray from the largest target of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_isocenters_largest </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of isocenters used from the largest target of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> max_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Maximum dose in Gray from the largest target of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> min_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Minimum dose in Gray of the largest target of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> mean_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Mean dose in Gray within the largest target of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> dose_rate </td>
        <td> float </td>
        <td> <br> </td>
        <td> Dose rate in Gray per minute of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> beam_on_time </td>
        <td> float </td>
        <td> <br> </td>
        <td> Total beam on time in minutes of the specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> repeat_gks </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether specified procedure is a repeat gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> kps_at_gks </td>
        <td> int </td>
        <td> <br> </td>
        <td> Karnofsky Performance Status (KPS) of patient at time of specified gamma knife procedure  </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> boost_after_wbrt </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether specified gamma knife procedure was a boost of prior whole brain radiation therapt (WBRT) </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> hemorrhagic_tumor_any </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether any tumors treated at specified gamma knife procedure were hemorrhagic </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> resection_bed_included </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether any targets treated at specified gamma knife procedure were a resection bed of a recently resected tumor </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> anticonvulsants_at_gks </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient was on anticonvulsant medications at the time of the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_srs_fractions </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of fractions required for specified gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> steroids_adjuvant </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient was on adjuvant steroids at the time of the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_imaging_type </td>
        <td> int </td>
        <td> 1 = MRI <br> 2 = CT </td>
        <td> Indicates the type of cranial imaging used for gamma knife planning </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> treatment_day_complication </td>
        <td> int </td>
        <td> 0 = No complications <br> 1 = Seizure <br> 2 = Anesthesia-related complication <br> 3 = GK unit dysfunction </td>
        <td> Indicates the type of complication, if any, that occured at the time of the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> anesthesia_type </td>
        <td> int </td>
        <td> 1 = Conscious sedation <br> 2 = local anesthetic <br> 3 = general anesthesia </td>
        <td> Indicates the type of anesthetic used during the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> fixation_type </td>
        <td> int </td>
        <td> 1 = Leksell Frame <br> 2 = Mask <br> 3 = Extend Frame </td>
        <td> Indicates the type of fixation applied during the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> stereotaxis_defined_by </td>
        <td> int </td>
        <td> 1 = Fiducial markers <br> 2 = Cone-based CT </td>
        <td> Indicates how stereotaxis targeting was determined during the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gamma_plan_used </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether radiosurgery plan was designed on program Gamma Plan during the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gamma_plan_algorithm </td>
        <td> int </td>
        <td> 1 = TMR10 <br> 2 = TMRClassic <br> 3 = Convolution </td>
        <td> Indicates the type of algorithm used by Gamma Plan during the specified gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> follow_up_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of follow up visits indexed from 1, per patient </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> employment_status_fu </td>
        <td> int </td>
        <td> 1 = Unemployed <br> 2 = Fully employed <br> 3 = Partially employed</td>
        <td> Employment status at follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_srs </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates patient underwent or was scheduled for upcoming repeat stereotactic radiosurgery around follow up visit  </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_wbrt </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates patient underwent or was scheduled for upcoming whole brain radiation therapy around follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> wbrt_dose </td>
        <td> int </td>
        <td> </td>
        <td> Dose of whole brain radiation therapy in unit Gray </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> wbrt_fractions </td>
        <td> int </td>
        <td> </td>
        <td> Number of fractions of whole brain radiation therapy </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_craniotomy </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates patient underwent or was scheduled for craniotomy around follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_crani_reason </td>
        <td> int </td>
        <td> 1 = Tumor progression <br> 2 = New metastasis <br> 3 = Tumor hemorrhage </td>
        <td> Reason for craniotomy </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_chemo </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates patient underwent or was scheduled for chemotherapy around follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_immuno </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates patient underwent or was scheduled for immunotherapy around follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_tumors_treated_to_date </td>
        <td> int </td>
        <td> <br> </td>
        <td> Cumulative number of tumors treated at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_complete_response </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors with a complete response at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_partial_response </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors with a partial response at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_tumor_progress </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors demonstrating tumor progression at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_tumor_hemorrhage </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of hemorrhagic tumors at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> new_metastases </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if imaging at time of follow up visit demonstated new brain metastases </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> num_new_tumors </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of new brain metastases at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> change_tumor_fu </td>
        <td> int </td>
        <td> 1 = Smaller (complete response) <br> 2 = Smaller (partial response) <br> 3 = Stable <br> 4 = Larger (growth) <br> 5 = Larger (swelling) </td>
        <td> Radiographic change in tumor size at follow up of largest tumor </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> macdonaldcriteria </td>
        <td> int </td>
        <td> 1 = Complete response <br> 2 = Partial response <br> 3 = Stable <br> 4 = Progression </td>
        <td> Tumor response based on MacDonald Criteria of the largest tumor </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> edema </td>
        <td> int </td>
        <td> 1 = Yes </td>
        <td> Indicates the presence of peritumoral edema on imaging at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> kps_fu </td>
        <td> int </td>
        <td> <br> </td>
        <td> Karnofsky Performance Status (KPS) of patient at time of follow up  </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> ctcae_hearing </td>
        <td> int </td>
        <td> 0 = No related adverse event <br> 1 = Grade 1 (mild) <br> 2 = Grade 2 (moderate)<br>3 = Grade 3 (severe) <br> 4 = Grade 4 (life-threatening) <br> 5 = Grade 5 (death)  </td>
        <td> Hearing loss with the number corresponding to a Grade from the Common Terminology Criteria for Adverse Events (CTCAE) to indicate severity </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> ctcae_cognitive </td>
        <td> int </td>
        <td> 0 = No related adverse event <br> 1 = Grade 1 (mild) <br> 2 = Grade 2 (moderate)<br>3 = Grade 3 (severe) <br> 4 = Grade 4 (life-threatening) <br> 5 = Grade 5 (death)  </td>
        <td> Cognitive decline with the number corresponding to a Grade from the Common Terminology Criteria for Adverse Events (CTCAE) to indicate severity </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> ctcae_cns_necrosis </td>
        <td> int </td>
        <td> 0 = No related adverse event <br> 1 = Grade 1 (mild) <br> 2 = Grade 2 (moderate)<br>3 = Grade 3 (severe) <br> 4 = Grade 4 (life-threatening) <br> 5 = Grade 5 (death)  </td>
        <td> CNS necrosis with the number corresponding to a Grade from the Common Terminology Criteria for Adverse Events (CTCAE) to indicate severity </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> ctcae_seizure </td>
        <td> int </td>
        <td> 0 = No related adverse event <br> 1 = Grade 1 (mild) <br> 2 = Grade 2 (moderate)<br>3 = Grade 3 (severe) <br> 4 = Grade 4 (life-threatening) <br> 5 = Grade 5 (death)  </td>
        <td> Seizure with the number corresponding to a Grade from the Common Terminology Criteria for Adverse Events (CTCAE) to indicate severity </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> double_vision </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes  </td>
        <td> Indicates whether patient had double vision at follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq5d_mobility </td>
        <td> int </td>
        <td> 1 = I have no problems in walking about <br> 2 = I have some problems in walking about <br> 3 = I am confined to bed </td>
        <td> Response to mobility prompt on EQ-5D instrument at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq5d_selfcare </td>
        <td> int </td>
        <td> 1 = I have no problems with self-care <br> 2 = I have some problems washing or dressing myself <br> 3 = I am unable to wash or dress myself </td>
        <td> Response to self-care prompt on EQ-5D instrument at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq5d_usualactivities </td>
        <td> int </td>
        <td> 1 = I have no problems with performing my usual activities <br> 2 = I have some problems with performing my usual activities <br> 3 = I am unable to perform my usual activities </td>
        <td> Response to usual activites prompt on EQ-5D instrument at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq5d_pain </td>
        <td> int </td>
        <td> 1 = I have no pain or discomfort <br> 2 = I have moderate pain or discomfort <br> 3 = I have extreme pain or discomfort </td>
        <td> Response to pain/discomfort prompt on EQ-5D instrument at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq5d_anxiety </td>
        <td> int </td>
        <td> 1 = I am not anxious or depressed <br> 2 = I am moderately anxious or depressed <br> 3 = I am extremely anxious or depressed </td>
        <td> Response to anxiety/depression prompt on EQ-5D instrument at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> eq_vas_score </td>
        <td> int </td>
        <td> <br> </td>
        <td> Response to EQ-VAS to self report health between 100 (best imaginable health) and 0 (worst imaginable health) at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> facial_numbness_left </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had left-sided facial numbness at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> facial_numbness_right </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had right-sided facial numbness at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> vocal_cord_dysfunction </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had vocal cord dysfunction at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> dysphagia </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had dysphagia at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> visual_acuity_left </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had decline in left eye visual acuity at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> visual_acuity_right </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had decline in right eye visual acuity at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> tongue_weakness </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had tongue weakness at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> gait_impairment </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had gait impairment at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> sensory_deficit </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had sensory deficit at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> neurostatus </td>
        <td> int </td>
        <td> 1 = Improved <br> 2 = Stable <br> 3 = Worse </td>
        <td> Reports relative change in neurological status at current follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> anticonvulsant_use_fu </td>
        <td> int </td>
        <td> 0 = Not taking anticonvulsants <br> 1 = Taking anticonvulsants </td>
        <td> Indicates whether patient is taking anticonvulsants at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> anticonvulsant_changes </td>
        <td> int </td>
        <td> 0 = Not taking <br> 1 = Dose decreased <br> 2 = Dose stable <br> 3 = Dose increased </td>
        <td> Reports changes in anticonvulsant dosage at this visit </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> steroid_use_fu </td>
        <td> int </td>
        <td> 0 = Not taking steroids <br> 1 = Taking steroids </td>
        <td> Indicates whether patient is taking steroids at time of follow up visit </td>
    </tr>
    <tr></tr>
    <tr class="death">   
        <td> death </td>
        <td> int </td>
        <td> 0 = alive <br> 1 = death </td>
        <td> Indicates whether patient died at reported time </td>
   </tr>
   <tr></tr>
    <tr class="death">   
        <td> cause_of_death </td>
        <td> int </td>
        <td> 1 = Progression of brain metastases <br> 2 = Systemic disease progression <br> 3 = Other </td>
        <td> Reports cause of death if patient died <br><span class="note"> (note: The most common "other" were infection and pulmonary embolism) </span></td>
    </tr>
</table>
</div>
<br>
<br>
<br>
<div id="individual_dataset" class="title">
    <h3> Individual Dataset </h3>
</div>
<div>
<table>
    <tr>
            <th> Variable </th>
            <th> Type </th>
            <th> Key </th>
            <th> Description </th>
    </tr>
    <tr>
        <td> patient_identifier </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 8-digit identifier unique to each patient </td>
    </tr>
    <tr>
        <td> age_diagnosis </td>
        <td> int </td>
        <td> <br> </td>
        <td> Patient age at time of primary cancer diagnosis </td>
    </tr>
    <tr>
        <td> total_fu_time </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total amount of follow up time in days from initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> tobacco_use_init </td>
        <td> int </td>
        <td> 0 = Never <br> 1 = Former, quit more than one year before diagnosis <br> 2 = Former, quit within one year of diagnosis <br> 3 = Former, unknown quit time <br> 4 = Current use </td>
        <td> Patient reported tobacco use at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> smoking_pack_years </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of pack years if cigarette smoker </td>
    </tr>
    <tr>
        <td> weight_init </td>
        <td> float </td>
        <td> <br> </td>
        <td> Patient weight in kilograms at initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> height_init </td>
        <td> float </td>
        <td> <br> </td>
        <td> Patient height in centimeters at initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> height_init </td>
        <td> float </td>
        <td> <br> </td>
        <td> Patient height in centimeters at initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> employment_init </td>
        <td> int </td>
        <td> 1 = Unemployed <br> 2 = Fully employed <br> 3 = Partially employed </td>
        <td> Patient employment status at initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> primary_histology </td>
        <td> int </td>
        <td> 1 = Lung cancer <br> 2 = Melanoma <br> 3 = Breast cancer <br> 4 = Synovial sarcoma <br> 5 = Gastrointestinal cancer <br> 6 = Renal cell carcinoma <br> 7 = Uterine cancer <br> 8 = Ovarian cancer <br> 9 = Pancreatic cancer <br> 10 = Prostate cancer <br> 11 = Bladder cancer <br> 12 = Testicular cancer <br> 13 = Lymphoma </td>
        <td> Primary cancer diagnosis </td>
    </tr>
    <tr>
        <td> histol_confirmed </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient's primary cancer was histologically confirmed </td>
    </tr>
    <tr>
        <td> extent_of_disease_init </td>
        <td> int </td>
        <td> 1 = Brain only <br> 2 = Brain and primary <br> 3 = Brain, primary, and one other metastatic location <br> 4 = Brain, primary, and more than one metastatic location </td>
        <td> Extent of patient's disease at time of initial evaluation for gamma knife radiosurgery</td>
    </tr>
    <tr>
        <td> site_earliest_met </td>
        <td> int </td>
        <td> 1 = Brain <br> 2 = Liver <br> 3 = Bone <br> 4 = Lung <br> 5 = Other </td>
        <td> Location of first identified metastatic lesion </td>
    </tr>
    <tr>
        <td> extracranial_disease_status </td>
        <td> int </td>
        <td> 1 = Controlled <br> 2 = Active </td>
        <td> Status of extracranial disease at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> num_tumors_init </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of intracranial metastases at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_srs </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had history of prior stereotactic radiosurgery before indexed initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> days_srs_before_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days that patient had prior stereotactic radiosurgery before indexed initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_chemo </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had chemotherapy before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_immuno </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had immunotherapy before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_brain_surgery </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had brain surgery before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> days_surg_before_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days that patient had prior brain surgery before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_intracranial_hemorrhage </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had intracranial hemorrhage before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_extracranial_rad </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had any extracranial radiation therapy before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> prior_wbrt </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient underwent whole brain radiation therapy (WBRT) before initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> wbrt_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Dose of whole brain radiation therapy (WBRT) in Gray if patient underwent WBRT prior to initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> wbrt_fractions </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of fractions of whole brain radiation therapy (WBRT) if patient underwent WBRT prior to initial gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> days_wbrt_before_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days that patient completed whole brain radiation therapy before initial gamma knife radiosurgery </td>
    </tr>
        <tr>
        <td> rpa </td>
        <td> int </td>
        <td> 1 = Class 1: KPS >= 70, <br> < 65 years of age, controlled primary and no evidence of disease other than intracrnaial disease <br> 2 = Class 2: All others not in class 1 or 3 <br> 3 = Class 3: KPS < 70 </td>
        <td> Recursive partitioning analysis (RPA) of prognostic factors based on the classes developed by the Radiation Therapy Oncology Group (RTOG)groups </td>
    </tr>
    <tr>
        <td> primary_diag_incidental </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether primary cancer diagnosis was found incidentally, without any presenting symptoms </td>
    </tr>
    <tr>
        <td> primary_sym_headache </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with headache when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_seizure </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a seizure when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_neurodef </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a neurological deficit when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_pain </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with pain when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_bleeding </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with bleeding when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_bleeding </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with bleeding when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> primary_sym_other </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a different symptom when primary cancer diagnosis was determined</td>
    </tr>
    <tr>
        <td> brain_diag_incidental </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether brain metastases were diagnosed incidentally, generally on screening imaging, without new symptoms </td>
    </tr>
    <tr>
        <td> brain_pres_seizure </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a seizure when brain metastases were diagnosed </td>
    </tr>
    <tr>
        <td> brain_pres_hemorrhage </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with intracranial hemorrhage when brain metastases were diagnosed </td>
    </tr>
    <tr>
        <td> brain_pres_neurodeficit </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a neurologic deficit when brain metastases were diagnosed </td>
    </tr>
    <tr>
        <td> brain_pres_headache </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient presented with a headache when brain metastases were diagnosed </td>
    </tr>
    <tr>
        <td> vision_impair_left </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had decline in left eye visual acuity at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> vision_impair_right </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had decline in right eye visual acuity at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> double_vision </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had double vision at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> facial_numb_left </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had left-sided facial numbness at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> facial_numb_right </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had right-sided facial numbness at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> dysphagia </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had dysphagia at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> vocal_cord_dysfunction </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had vocal cord dysfunction at time of initial evaluation for gamma knife radiosurgery  </td>
    </tr>
    <tr>
        <td> nd_cranial_nerve </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates whether patient had any cranial nerve deficits at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn1_deficit </td>
        <td> int </td>
        <td> 0 = No deficit <br> 1 = Cranial nerve deficit </td>
        <td> Describes cranial nerve I deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
        <tr>
        <td> cn2_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve II deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn3_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve III deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn4_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve IV deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn5_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve V deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn6_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve VI deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn7_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve VII deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn8_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve VIII deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn9_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve IX deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn10_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve X deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn11_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve XI deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> cn12_deficit </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Unilateral <br> 2 = Bilateral </td>
        <td> Describes cranial nerve XII deficit at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
     <tr>
        <td> nd_sensory </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient had any sensory neurologic deficits at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_tongue_weakness </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient had tongue wekaness at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_gait </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient had gait impairment at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_visual </td>
        <td> int </td>
        <td> 0 = No visual deficits <br> 1 = Scotoma <br> 2 = Quadrantanopsia <br> 3 = Hemianopsia <br> 4 = Blind (left) <br> 5 = Bline (right) </td>
        <td> Describes visual deficits, if any, at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_motor </td>
        <td> int </td>
        <td> 0 = No motor deficits <br> 1 = Monoparesis <br> 2 = Monoplegia <br> 3 = Hemiparesis <br> 4 = Hemiplegia <br> Quadriparesis </td>
        <td> Describes motor deficits, if any, at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_balance </td>
        <td> int </td>
        <td> 0 = None <br> 1 = Ataxia <br> 2 = Dysmetria <br> 3 = Mixed </td>
        <td> Describes balance impairments, if any, at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_concentration </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if the patient had a decline in ability to concentrate at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_memory </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if the patient had a decline in memory at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>
        <td> nd_othercognitive </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if the patient had other cognitive deficits at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>   
        <td> eq5d_mobility_init </td>
        <td> int </td>
        <td> 1 = I have no problems in walking about <br> 2 = I have some problems in walking about <br> 3 = I am confined to bed </td>
        <td> Response to mobility prompt on EQ-5D instrument at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
     <tr>  
        <td> eq5d_selfcare_init </td>
        <td> int </td>
        <td> 1 = I have no problems with self-care <br> 2 = I have some problems washing or dressing myself <br> 3 = I am unable to wash or dress myself </td>
        <td> Response to self-care prompt on EQ-5D instrument at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
     <tr>    
        <td> eq5d_usualactivities_init </td>
        <td> int </td>
        <td> 1 = I have no problems with performing my usual activities <br> 2 = I have some problems with performing my usual activities <br> 3 = I am unable to perform my usual activities </td>
        <td> Response to usual activites prompt on EQ-5D instrument at time of initial evaluation for gamma knife radiosurgery</td>
    </tr>
     <tr>    
        <td> eq5d_pain_init </td>
        <td> int </td>
        <td> 1 = I have no pain or discomfort <br> 2 = I have moderate pain or discomfort <br> 3 = I have extreme pain or discomfort </td>
        <td> Response to pain/discomfort prompt on EQ-5D instrument at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
     <tr>  
        <td> eq5d_anxiety_init </td>
        <td> int </td>
        <td> 1 = I am not anxious or depressed <br> 2 = I am moderately anxious or depressed <br> 3 = I am extremely anxious or depressed </td>
        <td> Response to anxiety/depression prompt on EQ-5D instrument at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr>   
        <td> eq_vas_score_init </td>
        <td> int </td>
        <td> <br> </td>
        <td> Response to EQ-VAS to self report health between 100 (best imaginable health) and 0 (worst imaginable health) at time of initial evaluation for gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="image">   
        <td> images_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of cranial imaging events </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of gamma knife procedures  </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> total_vol_all_targets_all_gk </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume in cubic centimeters of gamma knife targets from all gamma knife procedures </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> total_num_tumors_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of tumors targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_lobar_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in cerebrum targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_brainstem_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in the brainstem targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_thal_bg_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in the thalamus or basal ganglia targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_cerebellum_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in cerebellum targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> num_skull_all_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Number of tumors located in the calvarium targeted in all gamma knife plans </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> follow_up_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of follow up visits </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_srs </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient underwent repeat stereotactic radiosurgery after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_wbrt </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient underwent whole brain radiation therapy after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_craniotomy </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient underwent craniotomy after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_chemo </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient underwent chemotherapy after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="fu_appt">   
        <td> subseq_immuno </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if patient underwent immunotherapy after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="death">   
        <td> death </td>
        <td> int </td>
        <td> 0 = alive <br> 1 = death </td>
        <td> Indicates whether patient died </td>
   </tr>
    <tr></tr>
    <tr class="death">
        <td> days_to_death_from_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days after initial gamma knife radiosurgery until death </td>
    </tr>
    <tr></tr>
    <tr class="death">
        <td> days_to_death_from_diag </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days after primary cancer diagnosis until death </td>
    </tr>
    <tr></tr>
    <tr class="death">   
        <td> cause_of_death </td>
        <td> int </td>
        <td> 1 = Progression of brain metastases <br> 2 = Systemic disease progression <br> 3 = Other </td>
        <td> Reports cause of death if patient died </td>
    </tr>
</table>
</div>
<br>
<br>
<br>
<div id="gk_details" class="title">
    <h3> Gamma Knife Details Dataset </h3>
</div>
<div>
<table>
    <tr>
            <th> Variable </th>
            <th> Type </th>
            <th> Key </th>
            <th> Description </th>
    </tr>
    <tr>
        <td> patient_identifier </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 8-digit identifier unique to each patient </td>
    </tr>
    <tr class="gk">   
        <td> gk_id </td>
        <td> int </td>
        <td> <br> </td>
        <td> Randomly generated 9-digit identifier unique to each gamma knife procedure </td>
    </tr>
    <tr></tr>
    <tr class="gk">
        <td> days_after_initial_gk </td>
        <td> int </td>
        <td> <br> </td>
        <td> Time in days after initial gamma knife radiosurgery </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gk_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of gamma knife procedures indexed from 1, per patient  </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> target_count </td>
        <td> int </td>
        <td> <br> </td>
        <td> Count of gamma knife targets indexed from 1, per gamma knife plan  </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> total_targets </td>
        <td> int </td>
        <td> <br> </td>
        <td> Total number of gamma knife targets of gamma knife plan </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> largest_target_in_plan </td>
        <td> int </td>
        <td> 0 = No <br> 1 = Yes </td>
        <td> Indicates if target is largest in plan, corresponding to the represented target in the time series dataset </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> target_working_label </td>
        <td> string </td>
        <td> </td>
        <td> Label applied to individual target during planning to differentiate targets based on location <br><span class="note"> (note: These are working labels and no standard terminology or abbreviations applied) </span></td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> target_volume </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume of outlined target in cubic centimeters </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> planned_isodose_volume </td>
        <td> float </td>
        <td> <br> </td>
        <td> Planed Isodose Volume (PIV) in cubic centimeters of the target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gtvpiv </td>
        <td> float </td>
        <td> <br> </td>
        <td> Gross target volume (GTV) in planned isodose volume (PIV) </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> pci </td>
        <td> float </td>
        <td> <br> </td>
        <td> Paddick Conformity Index (PCI) of the target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> gri </td>
        <td> float </td>
        <td> <br> </td>
        <td> Gradient index of the target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> margin_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Margin dose in unit Gray of the target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> percent_isodose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Prescription isodose line in percentage for the target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> volume_12gy </td>
        <td> float </td>
        <td> <br> </td>
        <td> Volume of tissue in cubic centimeters that received 12 Gray from target </td>
    </tr>
    <tr></tr>
    <tr class="gk">   
        <td> max_dose </td>
        <td> float </td>
        <td> <br> </td>
        <td> Maximum dose in Gray from the target </td>
    <tr></tr>
    <tr class="gk">   
        <td> beam_on_time </td>
        <td> float </td>
        <td> <br> </td>
        <td> Total beam on time in minutes of the specified gamma knife plan </td>
    <tr></tr>
    <tr class="gk">   
        <td> total_vol_all_targets </td>
        <td> float </td>
        <td> <br> </td>
        <td> Total volume in cubic centimeters of all gamma knife targets from procedure </td>
    </tr>
