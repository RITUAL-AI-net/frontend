import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { trustcalcService } from "src/app/services/trustcalc.service";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-analyze",
  templateUrl: "analyze.component.html",
  styleUrls: ["analyze.component.scss"],
  providers: [NgbModalConfig, NgbModal],
})
export class analyzeComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public showVal1: boolean = true;

  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;

  toggleVal(): void {
    this.showVal1 = !this.showVal1;
    this.fairnessMax = this.methodMax = this.pillarMax = this.robustMax = this.explainMax = "1";
  }

  convertFunction = (data: any) => {
    for (const keyIt in data) {
      const type = typeof data[keyIt];
      if (type == 'object' || type == 'string') continue;
      data[keyIt] = parseFloat(data[keyIt]).toFixed(2);
    }

    return data;
  }

  ScenarioName: any;
  SolutionName: any;
  TrainnigDatafile: File;
  TestFile: File;
  FactsheetFile: File;
  ModelFile: File;
  // form: FormGroup;
  trustcalc = {
    SelectScenario: '',
    SelectSolution: '',
    NameSolution: '',
    DescriptionSolution: '',
    // TrainingFile: '',
    // TestFile: '',
    // FactsheetFile: '',
    // ModelFile: '',
    Targetcolumn: '',
    // TrainnigDatafile: File,
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',

    accuracy: '',
    classweightedf1score: '',
    classweightedprecision: '',
    classweightedrecall: '',
    globalf1score: '',
    globalprecision: '',
    globalrecall: '',

    ModelType: '',
    NormalizationTechnique: '',
    TrainTestSplit: '',
    RegularizationTechnique: '',
    DataSize: '',
    NumberofFeatures: '',

    modelname: '',
    purposedesc: '',
    trainingdatadesc: '',
    modelinfo: '',
    authors: '',
    contactinfo: '',

    fairness_score: '',
    explainability_score: '',
    methodology_score: '',
    robustness_score: '',

    underfitting: '',
    overfitting: '',
    statistical_parity_difference: '',
    equal_opportunity_difference: '',
    average_odds_difference: '',
    disparate_impact: '',
    class_balance: '',

    algorithm_class: '',
    correlated_features: '',
    permutation_feature_importance: '',
    model_size: '',
    feature_relevance: '',

    confidence_score: '',
    clique_method: '',
    loss_sensitivity: '',
    clever_score: '',
    er_fast_gradient_attack: '',
    er_carlini_wagner_attack: '',
    er_deepfool_attack: '',

    normalization: '',
    missing_data: '',
    regularization: '',
    train_test_split: '',
    factsheet_completeness: '',

  };

  weights = {
    fairness: {
      main: 0,
      underfitting: 0,
      overfitting: 0,
      statistical_parity_difference: 0,
      equal_opportunity_difference: 0,
      average_odds_difference: 0,
      disparate_impact: 0,
      class_balance: 0,
    },
    explainability: {
      main: 0,
      algorithm_class: 0,
      correlated_features: 0,
      model_size: 0,
      feature_relevance: 0,
      permutation_feature_importance: 0,
    },
    robustness: {
      main: 0,
      confidence_score: 0,
      clique_method: 0,
      loss_sensitivity: 0,
      clever_score: 0,
      er_fast_gradient_attack: 0,
      er_carlini_wagner_attack: 0,
      er_deepfool_attack: 0,
    },
    methodology: {
      main: 0,
      normalization: 0,
      missing_data: 0,
      regularization: 0,
      train_test_split: 0,
      factsheet_completeness: 0,
    }
  };

  constructor(private trustcalcservice: trustcalcService, config: NgbModalConfig, public modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.trustcalc.emailid = localStorage.getItem('email');
    this.trustcalcservice.get(localStorage.getItem('email')).subscribe((data: any) => {
      this.ScenarioName = data.ScenarioName;
    });
    this.trustcalcservice.getsolution(localStorage.getItem('email')).subscribe((data: any) => {
      this.SolutionName = data.SolutionName;
    });
    

  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

  description: any = {
    fairness: {
    },
    explainability: {
    },
    methodology: {
    },
    robustness: {
    },
    fairnessText: "",
    explainabilityText: "",
    methodologyText: "",
    robustnessText: "",
  };

  analyze(): void {
    const formData = new FormData();
    formData.append('Userid', this.trustcalc.Userid);
    formData.append('emailid', this.trustcalc.emailid);
    formData.append('SelectScenario', this.trustcalc.SelectScenario);
    formData.append('SelectSolution', this.trustcalc.SelectSolution);

    this.trustcalcservice.analyzesolution(formData)
      .subscribe(
        response => {
          response = this.convertFunction(response);
          console.log('res:', response);
          this.trustcalc.ScenarioName = response.ScenarioName;
          this.trustcalc.LinktoDataset = response.LinktoDataset;
          this.trustcalc.Description = response.Description;

          this.trustcalc.accuracy = response.accuracy;
          this.trustcalc.classweightedf1score = response.classweightedf1score;
          this.trustcalc.classweightedprecision = response.classweightedprecision;
          this.trustcalc.classweightedrecall = response.classweightedrecall;
          this.trustcalc.globalf1score = response.globalf1score;
          this.trustcalc.globalprecision = response.globalprecision;
          this.trustcalc.globalrecall = response.globalrecall;

          this.trustcalc.ModelType = response.ModelType;
          this.trustcalc.NormalizationTechnique = response.NormalizationTechnique;
          this.trustcalc.TrainTestSplit = response.TrainTestSplit;
          this.trustcalc.RegularizationTechnique = response.RegularizationTechnique;
          this.trustcalc.DataSize = response.DataSize;
          this.trustcalc.NumberofFeatures = response.NumberofFeatures;

          this.trustcalc.modelname = response.modelname;
          this.trustcalc.purposedesc = response.purposedesc;
          this.trustcalc.trainingdatadesc = response.trainingdatadesc;
          this.trustcalc.modelinfo = response.modelinfo;
          this.trustcalc.authors = response.authors;
          this.trustcalc.contactinfo = response.contactinfo;

          this.trustcalc.fairness_score = response.fairness_score;
          this.trustcalc.explainability_score = response.explainability_score;
          this.trustcalc.methodology_score = response.methodology_score;
          this.trustcalc.robustness_score = response.robustness_score;

          this.trustcalc.underfitting = response.underfitting;
          this.trustcalc.overfitting = response.overfitting;
          this.trustcalc.statistical_parity_difference = response.statistical_parity_difference;
          this.trustcalc.equal_opportunity_difference = response.equal_opportunity_difference;
          this.trustcalc.average_odds_difference = response.average_odds_difference;
          this.trustcalc.disparate_impact = response.disparate_impact;
          this.trustcalc.class_balance = response.class_balance;

          this.trustcalc.algorithm_class = response.algorithm_class;
          this.trustcalc.correlated_features = response.correlated_features;
          this.trustcalc.model_size = response.model_size;
          this.trustcalc.feature_relevance = response.feature_relevance;
          this.trustcalc.permutation_feature_importance = response.permutation_feature_importance;

          this.trustcalc.confidence_score = response.confidence_score;
          this.trustcalc.clique_method = response.clique_method;
          this.trustcalc.loss_sensitivity = response.loss_sensitivity;
          this.trustcalc.clever_score = response.clever_score;
          this.trustcalc.er_fast_gradient_attack = response.er_fast_gradient_attack;
          this.trustcalc.er_carlini_wagner_attack = response.er_carlini_wagner_attack;
          this.trustcalc.er_deepfool_attack = response.er_deepfool_attack;

          this.trustcalc.normalization = response.normalization;
          this.trustcalc.missing_data = response.missing_data;
          this.trustcalc.regularization = response.regularization;
          this.trustcalc.train_test_split = response.train_test_split;
          this.trustcalc.factsheet_completeness = response.factsheet_completeness;

          this.weights = response.weight;

          this.description.fairness.underfitting_property = response.underfitting_property;
          this.description.fairness.overfitting_property = response.overfitting_property;
          this.description.fairness.statistical_parity_difference_property = response.statistical_parity_difference_property;
          this.description.fairness.equal_opportunity_difference_property = response.equal_opportunity_difference_property;
          this.description.fairness.average_odds_difference_property = response.average_odds_difference_property;
          this.description.fairness.disparate_impact_property = response.disparate_impact_property;
          this.description.fairness.class_balance_property = response.class_balance_property;
          this.description.explainability.algorithm_class_property = response.algorithm_class_property;
          this.description.explainability.correlated_features_property = response.correlated_features_property;
          this.description.explainability.model_size_property = response.model_size_property;
          this.description.explainability.feature_relevance_property = response.feature_relevance_property;
          this.description.explainability.permutation_feature_importance_property = response.permutation_feature_importance_property;
          this.description.methodology.normalization_property = response.normalization_property;
          this.description.methodology.missing_data_property = response.missing_data_property;
          this.description.methodology.regularization_property = response.regularization_property;
          this.description.methodology.train_test_split_property = response.train_test_split_property;
          this.description.methodology.factsheet_completeness_property = response.factsheet_completeness_property;
          this.description.robustness.confidence_score_property = response.confidence_score_property;
          this.description.robustness.clique_method_property = response.clique_method_property;
          this.description.robustness.clever_score_property = response.clever_score_property;
          this.description.robustness.er_fast_gradient_attack_property = response.er_fast_gradient_attack_property;
          this.description.robustness.er_carlini_wagner_attack_property = response.er_carlini_wagner_attack_property;
          this.description.robustness.er_deepfool_attack_property = response.er_deepfool_attack_property;
          this.description.robustness.loss_sensitivity_property = response.loss_sensitivity_property;

          this.makeDescriptionText();
        },
        error => {
          this.modalService.open(this.dialogRef);
        }
      )
  };

  open(dialogRef) {
    this.modalService.open(dialogRef);
  }

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://130.60.156.180:8000/api/factsheet_download');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  scorePanelVisibility: boolean = false;
  showScoreBoard() {
    console.log('this clicked');
    this.scorePanelVisibility = !this.scorePanelVisibility;
  }

  apply() {
    console.log('under:', this.weights.fairness.underfitting);
    if (this.showVal1) {
      this.trustcalc.fairness_score = (parseFloat(this.trustcalc.underfitting) * this.weights.fairness.underfitting + parseFloat(this.trustcalc.overfitting) * this.weights.fairness.overfitting + parseFloat(this.trustcalc.statistical_parity_difference) * this.weights.fairness.statistical_parity_difference + parseFloat(this.trustcalc.equal_opportunity_difference) * this.weights.fairness.equal_opportunity_difference + parseFloat(this.trustcalc.average_odds_difference) * this.weights.fairness.average_odds_difference + parseFloat(this.trustcalc.disparate_impact) * this.weights.fairness.disparate_impact + parseFloat(this.trustcalc.class_balance) * this.weights.fairness.class_balance).toFixed(2);
      this.trustcalc.explainability_score = (parseFloat(this.trustcalc.algorithm_class) * this.weights.explainability.algorithm_class + parseFloat(this.trustcalc.correlated_features) * this.weights.explainability.correlated_features + parseFloat(this.trustcalc.model_size) * this.weights.explainability.model_size + parseFloat(this.trustcalc.feature_relevance) * this.weights.explainability.feature_relevance).toFixed(2);
      this.trustcalc.methodology_score = (parseFloat(this.trustcalc.normalization) * this.weights.methodology.normalization + parseFloat(this.trustcalc.missing_data) * this.weights.methodology.missing_data + parseFloat(this.trustcalc.regularization) * this.weights.methodology.regularization + parseFloat(this.trustcalc.train_test_split) * this.weights.methodology.train_test_split + parseFloat(this.trustcalc.factsheet_completeness) * this.weights.methodology.factsheet_completeness).toFixed(2);
      this.trustcalc.robustness_score = (parseFloat(this.trustcalc.confidence_score) * this.weights.robustness.confidence_score + parseFloat(this.trustcalc.clique_method) * this.weights.robustness.clique_method + parseFloat(this.trustcalc.loss_sensitivity) * this.weights.robustness.loss_sensitivity + parseFloat(this.trustcalc.clever_score) * this.weights.robustness.clever_score + parseFloat(this.trustcalc.er_fast_gradient_attack) * this.weights.robustness.er_fast_gradient_attack + parseFloat(this.trustcalc.er_carlini_wagner_attack) * this.weights.robustness.er_carlini_wagner_attack + parseFloat(this.trustcalc.er_deepfool_attack) * this.weights.robustness.er_deepfool_attack).toFixed(2);
    } else {
      this.trustcalc.fairness_score = (parseFloat(this.trustcalc.underfitting) * this.weights.fairness.underfitting + parseFloat(this.trustcalc.overfitting) * this.weights.fairness.overfitting + parseFloat(this.trustcalc.statistical_parity_difference) * this.weights.fairness.statistical_parity_difference + parseFloat(this.trustcalc.disparate_impact) * this.weights.fairness.disparate_impact).toFixed(2);
      this.trustcalc.explainability_score = (parseFloat(this.trustcalc.correlated_features) * this.weights.explainability.correlated_features + parseFloat(this.trustcalc.model_size) * this.weights.explainability.model_size + parseFloat(this.trustcalc.permutation_feature_importance) * this.weights.explainability.permutation_feature_importance).toFixed(2);
      this.trustcalc.methodology_score = (parseFloat(this.trustcalc.normalization) * this.weights.methodology.normalization + parseFloat(this.trustcalc.missing_data) * this.weights.methodology.missing_data + parseFloat(this.trustcalc.train_test_split) * this.weights.methodology.train_test_split + parseFloat(this.trustcalc.factsheet_completeness) * this.weights.methodology.factsheet_completeness).toFixed(2);
      this.trustcalc.robustness_score = (parseFloat(this.trustcalc.clever_score) * this.weights.robustness.clever_score).toFixed(2);
    }
  }

  fairnessMax = "1";
  explainMax = "1";
  robustMax = "1";
  methodMax = "1";
  pillarMax = "1";
  updateSliderMax = () => {
    this.fairnessMax = (1 -
      this.weights.fairness.average_odds_difference -
      this.weights.fairness.class_balance -
      this.weights.fairness.disparate_impact -
      this.weights.fairness.equal_opportunity_difference -
      this.weights.fairness.overfitting -
      this.weights.fairness.statistical_parity_difference -
      this.weights.fairness.underfitting).toString();

    this.explainMax = (1 -
      this.weights.explainability.algorithm_class -
      this.weights.explainability.correlated_features -
      this.weights.explainability.feature_relevance -
      this.weights.explainability.model_size -
      this.weights.explainability.permutation_feature_importance).toString();

    this.robustMax = (1 - this.weights.robustness.clever_score -
      this.weights.robustness.clique_method -
      this.weights.robustness.confidence_score -
      this.weights.robustness.er_carlini_wagner_attack -
      this.weights.robustness.er_deepfool_attack -
      this.weights.robustness.er_fast_gradient_attack -
      this.weights.robustness.loss_sensitivity).toString();

    this.methodMax = (1 - this.weights.methodology.factsheet_completeness -
      this.weights.methodology.missing_data -
      this.weights.methodology.normalization -
      this.weights.methodology.regularization -
      this.weights.methodology.train_test_split).toString();

    this.pillarMax = (1 -
      this.weights.fairness.main -
      this.weights.explainability.main -
      this.weights.methodology.main -
      this.weights.robustness.main).toString();
  }

  propertyPanel: boolean = false;
  makeDescriptionText = () => {
    let innerHtml = '';
    for (const [key, value] of Object.entries(this.description.fairness)) {
      innerHtml += `
      <h4 style="color: mediumaquamarine">${key.replace(/^\w/, c => c.toUpperCase())}</h4>
      <pre>${JSON.stringify(value, null, 2).replace(/^\w/, c => c.toUpperCase())}</pre>`;
    }
    innerHtml = innerHtml.replace(/{/g, '').replace(/}/g, '').replace(/_property/g, '').replace(/"/g, '').replace(/'/g, '').replace(/_/g, ' ');
    this.description.fairnessText = innerHtml;
    innerHtml = '';
    for (const [key, value] of Object.entries(this.description.methodology)) {
      if (value == 'undefined' || value == undefined) continue;
      innerHtml += `
      <h4 style="color: mediumaquamarine">${key.replace(/^\w/, c => c.toUpperCase())}</h4>
      <pre>${value == 'undefined' ? '' : JSON.stringify(value, null, 2).replace(/^\w/, c => c.toUpperCase())}</pre>`;
    }
    innerHtml = innerHtml.replace(/{/g, '').replace(/}/g, '').replace(/_property/g, '').replace(/"/g, '').replace(/'/g, '').replace(/_/g, ' ');
    this.description.methodologyText = innerHtml;
    innerHtml = '';
    for (const [key, value] of Object.entries(this.description.explainability)) {
      console.log('va:', value);
      if (value == 'undefined' || value == undefined) continue;
      innerHtml += `
      <h4 style="color: mediumaquamarine">${key.replace(/^\w/, c => c.toUpperCase())}</h4>
      <pre>${value == 'undefined' ? '' : JSON.stringify(value, null, 2).replace(/^\w/, c => c.toUpperCase())}</pre>`;
    }
    innerHtml = innerHtml.replace(/{/g, '').replace(/}/g, '').replace(/_property/g, '').replace(/"/g, '').replace(/'/g, '').replace(/_/g, ' ');
    this.description.explainabilityText = innerHtml;
    innerHtml = '';
    for (const [key, value] of Object.entries(this.description.robustness)) {
      innerHtml += `
      <h4 style="color: mediumaquamarine">${key.replace(/^\w/, c => c.toUpperCase())}</h4>
      <pre>${JSON.stringify(value, null, 2).replace(/^\w/, c => c.toUpperCase())}</pre>`;
    }
    innerHtml = innerHtml.replace(/{/g, '').replace(/}/g, '').replace(/_property/g, '').replace(/"/g, '').replace(/'/g, '').replace(/_/g, ' ');
    this.description.robustnessText = innerHtml;
  }
}
