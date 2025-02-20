package com.berezovskoye.exceptions.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class TpuErrorResponse{
    private String message;
}
