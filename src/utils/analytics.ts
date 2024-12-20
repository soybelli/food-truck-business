// Type definitions for events
interface FormSubmitEvent {
  event: 'lead_form_submit';
  formName: string;
  formType: string;
  leadType?: string;
  listingId?: string;
}

interface ClickEvent {
  event: 'ulysses-click';
  elementName: string;
  elementType: string;
  destination: string;
}

type DataLayerEvent = FormSubmitEvent | ClickEvent;

// Type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

// Push events to dataLayer
export function pushToDataLayer(event: DataLayerEvent) {
  if (typeof window !== 'undefined') {
    window.dataLayer.push(event);
  }
}

// Specific function for form submission events
export function trackFormSubmission(formName: string, formType: string, leadType?: string, listingId?: string) {
  pushToDataLayer({
    event: 'lead_form_submit',
    formName,
    formType,
    leadType,
    listingId
  });
}

// Specific function for click events
export function trackClick(elementName: string, elementType: string, destination: string) {
  pushToDataLayer({
    event: 'ulysses-click',
    elementName,
    elementType,
    destination
  });
}