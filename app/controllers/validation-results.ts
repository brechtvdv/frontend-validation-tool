import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type { Bindings } from 'rdf-js';
import { tracked } from 'tracked-built-ins';
import {
  getBlueprintOfDocumentType,
  validatePublication,
} from 'validation-monitoring-module/src';
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

  @tracked validatedDocument: RDFShape[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    super(...args);
    this.validateDocument();
  }

  @action async getDocument() {
    return {
      dataType: 'Agenda',
      properties: [
        {
          name: 'Behandelt',
          found: 1,
        },
        {
          name: 'Start',
          found: 1,
        },
        {
          name: 'Einde',
          found: 0,
        },
        {
          name: 'Geplande Start',
          found: 1,
        },
        {
          name: 'Heeft Notulen',
          found: 0,
        },
      ],
    };
  }
  @action async validateDocument() {
    const document = await this.getDocument();
    const blueprint = await this.getBlueprint();
    console.log('bluepint', blueprint);
    const documentType = this.document.documentType;
    const validatedDocument: RDFShape[] = await validatePublication(
      this.document.document,
      blueprint,
    );

    for (const shape of blueprint) {
      const validatedShape: RDFShape = {
        type: shape.type,
        targetClass: shape.targetClass,
        properties: [],
        closed: shape.closed,
      };

      for (const property of shape.properties) {
        const foundProperty = document.properties.find(
          (p) => p.name === property.name,
        );

        const validatedProperty = {
          name: property.name,
          description: property.description,
          minCount: property.minCount || 0,
          maxCount: property.maxCount || 0,
          valid: false,
          amountFound: foundProperty?.found || 0,
        };

        if (
          (!validatedProperty.minCount && !validatedProperty.maxCount) ||
          validatedProperty.amountFound >= validatedProperty.minCount
        ) {
          validatedProperty.valid = true;
        }

        validatedShape.properties.push(validatedProperty);
      }

      validatedShape.amountOfProperties = validatedShape.properties.length;
      validatedShape.validAmountOfProperties = validatedShape.properties.filter(
        (p) => p.valid,
      ).length;

      validatedDocument.push(validatedShape);
    }

    return validatedDocument;
  }

  @action async getBlueprint(): Promise<Bindings[]> {
    return getBlueprintOfDocumentType(this.document.documentType);
  }
}