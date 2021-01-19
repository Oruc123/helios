import { FormFieldModel, FormModel } from 'utils/form';

export const ReportSettingsFields = {
  prod_amount: new FormFieldModel(false),
  prod_qty: new FormFieldModel(false),
  prod_per_qty: new FormFieldModel(false),
  sales_amount: new FormFieldModel(false),
  sales_qty: new FormFieldModel(false),
  sales_per_qty: new FormFieldModel(false),
  sales_pos: new FormFieldModel(false),
  tax: new FormFieldModel(false)
};

export const ReportSettingsModel = FormModel.Factory(ReportSettingsFields);

export const AppSettingsReportsFields = {
  period: new FormFieldModel('quarterly'),
  retail: new ReportSettingsModel(),
  wholesale: new ReportSettingsModel()
};

export const AppSettingsReportsModel = FormModel.Factory(AppSettingsReportsFields);

export const AppSettingsFields = {
  id: new FormFieldModel(null),
  organization_id: new FormFieldModel(null),
  report_setting: new AppSettingsReportsModel(),
  bank_notification_emails: new FormFieldModel(''),
  bank_document_first_notification_before_expiration: new FormFieldModel(0),
  bank_document_last_notification_before_expiration: new FormFieldModel(0),
  bank_documents_start_date: new FormFieldModel(null),
  report_alerts_criteria: new FormFieldModel(0),
  report_alerts_criteria_abs: new FormFieldModel(0),
  enable_bsa: new FormFieldModel(false),
  report_completion_day: new FormFieldModel(0),
  tax_period: new FormFieldModel('quarter'),
  aws_s3_accesskey: new FormFieldModel(''),
  aws_s3_secretkey: new FormFieldModel(''),
  aws_s3_bucket_name: new FormFieldModel(''),
  aws_sns_topic_arn: new FormFieldModel(''),
  metrc_software_api_key: new FormFieldModel(''),
  audit_companies_ids: new FormFieldModel([]),
  exam_companies_ids: new FormFieldModel([]),
  created_at: new FormFieldModel(null),
  updated_at: new FormFieldModel(null),
  deleted_at: new FormFieldModel(null),
  license_document_template_id: new FormFieldModel(null)
};

export const AppSettingsModel = FormModel.Factory(AppSettingsFields);

export const AppSettingsFilterModel = FormModel.Factory({});
