package com.crud_project.HCMUT.SSPS.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SSPSExceptionHandler {
    private int status;
    private String message;
    private long timeStamp;
}


