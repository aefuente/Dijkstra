class Line {
            constructor(x1,y1,x2,y2){
                this.x1 = x1;
                this.x2 = x2;
                this.y1 = y1;
                this.y2 = y2;
                this.weight = Math.floor(Math.random() * 20);
                this.connects = []
                this.txtcords = this.textcords();
                this.color = 'rgb(0,0,0)';
            }

            textcords(){
                let x;
                let y;
                let slope;
                let slopeinv;
                let intercept;
                let midpoint = [];
                midpoint.push((this.x2 + this.x1)/2);
                midpoint.push(-(this.y2+this.y1)/2);

                if(this.x2 > this.x1)
                    slope = -((this.y2 - this.y1) / (this.x2 - this.x1));
                else
                    slope = -((this.y1 - this.y2) / (this.x1 - this.x2));

                slopeinv = -Math.pow(slope,-1);

                intercept = midpoint[1] - (slopeinv * midpoint[0]);

                if (slopeinv === Infinity){
                    x = midpoint[0];
                    y = midpoint[1];
                }else {
                    let a = (1 + (slopeinv * slopeinv));
                    let b = (-(2 * midpoint[0]) + ( 2 * slopeinv * intercept) - (2 * midpoint[1] * slopeinv));
                    let c = (Math.pow(midpoint[0],2) + Math.pow(intercept,2) + Math.pow(midpoint[1], 2) - (2 * intercept * midpoint[1]) - 625);//225
                    let quadratic = Math.sqrt(Math.pow(b, 2) - (4 * a * c));

                    if (midpoint[0] > 250) {
                        x = (-b + quadratic) / (2 * a);
                        y = -((slopeinv * x) + intercept);
                    } else {
                        x = (-b - quadratic) / (2 * a);
                        // A short fix until i adjust the numbers to print from the middle.
                        y = -((slopeinv * x) + intercept);
                    }
                    return [x,y];
                }
            }
            setRed(){
                this.color = 'rgb(255,0,0)';
            }
            setDarkBlue(){
                this.color = 'rgb(0,0,255)';
            }
            setGreen(){
                this.color = 'rgb(0,255,0)';
            }
        }

        class Circle {
            constructor(x, y, count) {
                this.x = x;
                this.y = y;
                this.clickcount = 0;
                this.color = 'rgb(0, 255, 255)';
                this.name = String.fromCharCode(97 + count);
            }

            setRed(){
                this.color = 'rgb(255,0,0)';
            }

            setOrange(){
                this.color = 'rgb(255,100,0)';
            }
            setBlue(){
                this.color = 'rgb(0,255,255)';
            }

            setDarkBlue(){
                this.color = 'rgb(0,0,255)'
            }
            setGreen(){
                this.color = 'rgb(0,255,0)';
            }
        }