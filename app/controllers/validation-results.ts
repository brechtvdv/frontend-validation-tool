import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import {
  fetchDocument,
  getBlueprintOfDocumentType,
  validatePublication,
} from 'validation-monitoring-module';

import type DocumentService from 'validation-monitoring-tool/services/document';

export type RDFShape = {
  type: string;
  targetClass: string;
  properties: Array<RDFProperty>;
  amountOfProperties?: number;
  validAmountOfProperties?: number;
  closed?: boolean;
};

export type RDFProperty = {
  name: string;
  status?: string;
  description: string;
  path?: string;
  class?: string;
  datatype?: string;
  minCount?: number;
  maxCount?: number;
  valid?: boolean;
  amountFound?: number;
};

export default class ValidationResultsController extends Controller {
  @service declare document: DocumentService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @tracked validatedDocument: any = [];

  @tracked isLoading = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    super(...args);
    this.validateDocument().then((resp) => {
      this.validatedDocument = resp;
    });
  }

  @action async validateDocument() {
    const blueprint = await getBlueprintOfDocumentType(
      this.document.documentType,
    );
    const document = await fetchDocument(this.document.documentURL);
    const result = validatePublication(document, blueprint);
    console.log(result);

    await this.document.getMaturity(result);

    // filter out everything with the name 'undefined' or everything that starts with 'http'
    return result.filter((item: any) => {
      return item.typeName !== 'undefined' && !item.typeName.startsWith('http');
    });
  }
}
