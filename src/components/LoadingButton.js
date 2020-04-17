import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default function LoadingButton({isLoading, className, ...props}) {
  return (
    <Button className={className} {...props} disabled={isLoading}>

    { !isLoading ? props.children :
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true" />
    }

    </Button>
  );
}
