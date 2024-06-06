const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');

class MutualStep3 extends BaseForm {
  #carTabLabel;

  #regNumLabel;

  #regCertNumLabel;

  #carRegDateLabel;

  #carRegionLabel;

  #carVINLabel;

  #carTypeLabel;

  #carManufacturedYearLabel;

  #carEngineVolumeLabel;

  #carMarkLabel;

  #carModelLabel;

  constructor() {
    super(new XPATH('//label[@title="Гос. номер"]/following::span[@class="font-bold"]'), 'Mutual step 3');

    this.#carTabLabel = new Label(new XPATH('//div[@role="tab" and @tabindex=0]'), 'car tab label');
    this.#regNumLabel = new Label(new XPATH('//label[@title="Гос. номер"]/following::span[@class="font-bold"]'), 'reg num label');
    this.#regCertNumLabel = new Label(new XPATH('//label[@title="Номер свид. рег. ТС"]/following::span[@class="font-bold"]'), 'reg cert num label');
    this.#carRegDateLabel = new Label(new XPATH('//label[@title="Дата выдачи"]/following::span[@class="font-bold"]'), 'car reg date label');
    this.#carRegionLabel = new Label(new XPATH('//label[@title="Регион регистрации"]/following::span[@class="font-bold"]'), 'car region label');
    this.#carVINLabel = new Label(new XPATH('//label[@title="VIN/Номер кузова"]/following::span[@class="font-bold"]'), 'car VIN label');
    this.#carTypeLabel = new Label(new XPATH('//label[@title="Тип ТС"]/following::span[@class="font-bold"]'), 'car type label');
    this.#carManufacturedYearLabel = new Label(new XPATH('//label[@title="Год выпуска"]/following::span[@class="font-bold"]'), 'car manufactured year label');
    this.#carEngineVolumeLabel = new Label(new XPATH('//label[@title="Объем двигателя (куб.см)"]/following::span[@class="font-bold"]'), 'engine volume label');
    this.#carMarkLabel = new Label(new XPATH('//label[@title="Марка"]/following::span[@class="font-bold"]'), 'car mark label');
    this.#carModelLabel = new Label(new XPATH('//label[@title="Модель"]/following::span[@class="font-bold"]'), 'car model label');
  }

  getCarTabText() {
    return this.#carTabLabel.getText();
  }

  getCarRegNumText() {
    return this.#regNumLabel.getText();
  }

  getCarRegCertNumText() {
    return this.#regCertNumLabel.getText();
  }

  getCarRegDateLabelText() {
    return this.#carRegDateLabel.getText();
  }

  getCarRegionText() {
    return this.#carRegionLabel.getText();
  }

  getCarVINText() {
    return this.#carVINLabel.getText();
  }

  getCarTypeText() {
    return this.#carTypeLabel.getText();
  }

  getCarManufacturedYearText() {
    return this.#carManufacturedYearLabel.getText();
  }

  getCarEngineVolumeText() {
    return this.#carEngineVolumeLabel.getText();
  }

  getCarMarkText() {
    return this.#carMarkLabel.getText();
  }

  getCarModelText() {
    return this.#carModelLabel.getText();
  }
}

module.exports = new MutualStep3();
