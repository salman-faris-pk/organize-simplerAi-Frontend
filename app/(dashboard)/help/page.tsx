import { TopMainContent } from "@/components/top-main-content";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Zap,
  FileText,
  Shield,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";


export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Help Center - Document Extraction Assistant",
  description:
    "Get help with extracting data from invoices, receipts, bills, and card statements using our AI-powered pipeline. PDF files under 5MB only.",
  keywords: [
    "document extraction",
    "invoice processing",
    "PDF processing",
    "data extraction",
    "PDF extraction",
  ],
  openGraph: {
    title: "Help Center - Document Extraction Assistant",
    description:
      "Learn how to extract data from PDF documents with our AI-powered pipeline.",
    type: "website",
  },
};


export default function HelpPage (){
  return (
    <div className="min-h-screen bg-transparent">
      <TopMainContent title="Help Center" displayUploadButton={false} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="mb-8 sm:mb-12">
          <div className="rounded-xl border border-amber-200 bg-transparent backdrop-blur-sm p-5 sm:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {/* Icon */}
              <div className="shrink-0 hidden sm:block">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-sm">
                  <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Welcome to Document Extraction Assistant
                </h1>

                <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6">
                  Our AI-powered pipeline extracts structured data from PDF
                  documents including invoices, receipts, bills, and card
                  statements with high accuracy. This documentation will guide
                  you through using our system effectively.
                </p>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-amber-100/50 border border-amber-200 text-amber-800
                     text-xs sm:text-sm hover:bg-amber-100 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="flex-1">
                    
                    get started
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Quick Start Guide
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Getting started with our document extraction system is simple.
              Follow these three steps:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-amber-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  1. Upload PDF Documents
                </h3>
                <p className="text-gray-700">
                  Drag and drop or click to upload PDF files from your device.
                  We support <strong>PDF files only</strong> with a maximum file
                  size of <strong>5MB per document</strong>. You can upload
                  multiple PDFs in bulk, with a maximum of 10 documents per
                  batch.
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Note:</strong> Image files (JPG, PNG, etc.) must be
                  converted to PDF format before uploading.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  2. Review Extraction
                </h3>
                <p className="text-gray-700">
                  Once uploaded, our AI pipeline automatically processes your
                  PDF documents. Review the extracted data in the intuitive
                  interface and make any necessary corrections. All fields are
                  editable before finalizing.
                </p>
              </div>

              <div className="border-l-4 border-amber-400 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3. Export Data
                </h3>
                <p className="text-gray-700">
                  Export the extracted data in your preferred format including
                  CSV, Excel, or JSON. You can also integrate directly with
                  accounting software or download the structured data for
                  further processing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-amber-200/50" />

        {/* Extraction Pipeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Extraction Pipeline
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              Our document extraction process uses a sophisticated three-stage
              AI pipeline to ensure accurate and reliable data extraction from
              your PDF documents.
            </p>

            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs md:text-sm font-medium mb-2">
                      Step 1: PDF Processing
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Advanced PDF Text Recognition
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  We use advanced technology to extract text and data from PDF
                  documents. Our system processes both native PDFs and scanned
                  PDF documents, supporting multiple languages and various
                  document layouts while maintaining the original structure.
                </p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>File Requirements:</strong> PDF files only, under
                    5MB each. Image files must be converted to PDF format before
                    uploading.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs md:text-sm font-medium mb-2">
                      Step 2: Data Extraction
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Intelligent Information Extraction
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Our AI models intelligently extract key information from the
                  processed PDF text. This includes vendor names, dates,
                  amounts, line items, totals, payment terms, due dates, invoice
                  numbers, and other relevant references.
                </p>
                <p className="text-gray-700">
                  The system is trained on thousands of document types to
                  recognize patterns and extract data with high accuracy, even
                  from complex or non-standard PDF layouts.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs md:text-sm font-medium mb-2">
                      Step 3: Verification & Validation
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Data Accuracy Assurance
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  All extracted data undergoes multiple verification checks to
                  ensure accuracy and completeness. The system cross-references
                  extracted data, validates numerical calculations, flags
                  inconsistencies for review, and generates confidence scores
                  for each extraction.
                </p>
                <p className="text-gray-700">
                  This final stage provides you with reliable, verified data
                  ready for export or integration into your systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-amber-200/50" />

        {/* Supported Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Supported Document Types
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              Our system is optimized for extracting data from PDF versions of
              the following document types. Each document type has specific
              fields that our AI is trained to recognize and extract.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  Invoices (PDF)
                </h3>
                <p className="text-gray-700 mb-4">
                  We support various invoice types including supplier invoices,
                  service invoices, tax invoices, and proforma invoices in PDF
                  format. Our system extracts critical information such as:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                  <li>Invoice number and date</li>
                  <li>Total amount and tax calculations</li>
                  <li>Payment terms and due dates</li>
                  <li>Vendor and customer details</li>
                  <li>Line items with quantities and prices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🧾</span>
                  Receipts (PDF)
                </h3>
                <p className="text-gray-700 mb-4">
                  Process retail receipts, restaurant bills, and online purchase
                  receipts in PDF format. Key extracted information includes:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                  <li>Merchant name and location</li>
                  <li>Transaction date and time</li>
                  <li>Total amount and tax breakdown</li>
                  <li>Payment method used</li>
                  <li>Itemized purchase list</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🏦</span>
                  Card Statements (PDF)
                </h3>
                <p className="text-gray-700 mb-4">
                  Process credit card statements, debit card statements, and
                  bank statements in PDF format. We extract:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Account holder information</li>
                  <li>Statement period and closing dates</li>
                  <li>Total due and minimum payment amounts</li>
                  <li>Transaction lists with dates and amounts</li>
                  <li>Interest charges and fees</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-amber-200/50" />

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Best Practices for Optimal Results
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              Following these guidelines will help you achieve the highest
              accuracy rates when extracting data from your PDF documents.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl border border-emerald-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-600">
                    Recommended Practices for PDFs
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-600">
                        1
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Ensure PDF files are <strong>under 5MB</strong> in size
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-600">
                        2
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Convert images to PDF format before uploading
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-600">
                        3
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Use text-based PDFs for optimal accuracy
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-600">
                        4
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Ensure scanned PDFs have clear text and good contrast
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-600">
                    Restrictions & Limitations
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-amber-600">
                        1
                      </span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Image files not supported</strong> (JPG, PNG,
                      etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-amber-600">
                        2
                      </span>
                    </div>
                    <span className="text-gray-700">
                      PDF files larger than <strong>5MB</strong> will be
                      rejected
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-amber-600">
                        3
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Password-protected PDFs cannot be processed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-amber-600">
                        4
                      </span>
                    </div>
                    <span className="text-gray-700">
                      Avoid heavily scanned or low-quality PDF documents
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 border border-blue-200 rounded-xl">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                File Format Requirements
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>
                  <strong>Format:</strong> PDF files only (.pdf extension)
                </li>
                <li>
                  <strong>Maximum size:</strong> 5MB per PDF file
                </li>
                <li>
                  <strong>Maximum files per batch:</strong> 10 PDF documents
                </li>
                <li>
                  <strong>Supported:</strong> Native PDFs and scanned PDFs
                </li>
                <li>
                  <strong>Not supported:</strong> Images, Word documents, Excel
                  files, PowerPoint presentations
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-amber-200/50" />

        {/* FAQ & Support */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What file formats are supported?
              </h3>
              <p className="text-gray-700">
                We support <strong>PDF files only</strong> (.pdf extension).
                Each PDF must be under 5MB in size. Bulk upload of multiple PDF
                files is supported, with a maximum of 10 documents per batch.
                Image files must be converted to PDF format before uploading.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I upload image files like JPG or PNG?
              </h3>
              <p className="text-gray-700">
                No, we only support PDF files. If you have image files (JPG,
                PNG, BMP, TIFF, etc.), you need to convert them to PDF format
                before uploading. Most operating systems and online tools
                provide easy conversion from images to PDF.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is the maximum file size?
              </h3>
              <p className="text-gray-700">
                Each PDF file must be <strong>under 5MB</strong>. Larger files
                will be rejected by the upload system. If your PDF is larger
                than 5MB, consider compressing it or splitting it into multiple
                documents.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How many documents can I process at once?
              </h3>
              <p className="text-gray-700">
                You can upload up to 10 PDF documents simultaneously in a single
                batch. For larger volumes or enterprise needs, please contact
                our support team.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is my data secure?
              </h3>
              <p className="text-gray-700">
                Yes, all PDF documents are processed securely with end-to-end
                encryption. Your data is encrypted during upload, processing,
                and storage. We do not share your data with third parties and
                comply with data protection regulations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How accurate is the extraction from PDFs?
              </h3>
              <p className="text-gray-700">
                Accuracy depends on PDF quality and complexity. For clear,
                text-based PDFs, accuracy exceeds 95%. For scanned PDFs,
                accuracy may vary based on scan quality. All extractions are
                verified and you can review/edit results before finalizing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What languages are supported in PDFs?
              </h3>
              <p className="text-gray-700">
                We support text extraction from PDFs in multiple languages
                including English, Spanish, French, German, Italian, Portuguese,
                and several others. Contact support for specific language
                requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I export the extracted data?
              </h3>
              <p className="text-gray-700">
                Yes, extracted data can be exported in multiple formats
                including CSV, Excel, and JSON, or can be integrated directly
                with accounting software systems.
              </p>
            </div>

            <div className="mt-12 text-center p-8 rounded-2xl border border-amber-200/50 bg-linear-to-r from-amber-50/40 to-orange-50/40">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <HelpCircle className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Need More Help?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you with any questions or
                issues regarding PDF document processing. Contact us via email
                or phone for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="px-4 py-2 bg-white/80 border border-amber-300 rounded-lg text-amber-800">
                  extracta-@support.com
                </div>
                <div className="px-4 py-2 bg-white/80 border border-amber-300 rounded-lg text-amber-800">
                  +91 8943084655
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

